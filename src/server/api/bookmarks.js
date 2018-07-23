const express = require("express");
const router = express.Router();

const _ = require("lodash");
const axios = require("axios");
const Promise = require("bluebird");
const parseDomain = require("parse-domain");
const moment = require("moment");

const Bookmark = require("../models/bookmark.js");
const ObjectId = require("mongoose").Types.ObjectId;

// ============================================================
// db.getCollection('bookmarks').find({}).sort({ 'data.created': 1 })

// db.getCollection('bookmarks').updateMany(
//    { "userId": 3.0 },
//    {
//      $set: { "userId": ObjectId("59245c1a06a34053ace5c1da") }
//    }
// )

// db.getCollection('bookmarks').find({})
// ============================================================

// only returns a mongoose query, pending exec
const getPushbulletBookmarksQuery = queryParams => {
    let { singleRecord = false } = queryParams;
    let rest = queryParams;
    delete rest.singleRecord;

    return singleRecord
        ? Bookmark.find(
              Object.assign({}, rest, {
                  provider: "pushbullet"
              })
          )
        : Bookmark.find(
              Object.assign({}, rest, {
                  provider: "pushbullet"
              })
          );
};

// ==============================

const PB_API = axios.create({
    baseURL: "https://api.pushbullet.com/v2/"
});

// ==============================

const fetchPushesBasic = params => {
    const demoLimit = 2;

    let {
        access_token,
        cursor = null,
        modified_after = null,
        count = 1,
        userId
    } = params;

    console.log("fetchPushesBasic():count:", count);

    return PB_API.request({
        url: "/pushes",
        headers: {
            "Access-Token": access_token
        },
        params: {
            active: true,
            cursor,
            modified_after,
            limit: 400
        }
    })
        .then(res => {
            let { status, statusText, data } = res;
            let newPushes = data.pushes;

            if (newPushes && newPushes.length > 0) {
                Promise.map(newPushes, newPush => {
                    //TODO xz: ideally should also check if modified is < newPush.modified
                    return Bookmark.findOneAndUpdate(
                        {
                            provider: "pushbullet",
                            "data.iden": newPush.iden
                        },
                        {
                            $set: {
                                userId: new ObjectId(userId),
                                data: newPush
                            }
                        },
                        {
                            upsert: true
                        }
                    ).exec();
                });
            }

            let nextCursor = data.cursor;

            console.log("newPushes.length", newPushes.length);

            if (nextCursor && count < demoLimit) {
                // if (nextCursor) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        fetchPushesBasic({
                            userId,
                            access_token,
                            cursor: nextCursor,
                            count: ++count,
                            modified_after
                        })
                            .then(resolve)
                            .catch(reject);
                    }, 10000);
                });
            }
        })
        .catch(err => {
            throw err;
        });
};

const fetchFreshPushbullets = params => {
    console.log("fetchFreshPushbullets()");
    let { userId, access_token, rebuild = false } = params;

    return Bookmark.find({
        query: {
            provider: "pushbullet"
        },
        sort: [{ "data.modified": "asc" }]
    })
        .then(res => {
            if (res && res.length > 0) {
                let first, last;

                console.log("res[0]", res[0]);
                first = res[0];

                if (Math.max(res.length - 1, 0) != 0) {
                    console.log("res[res.length]", res[res.length]);
                    last = res[res.length];
                }

                return fetchPushesBasic({
                    userId,
                    access_token
                    // modified_after: firstModifiedPush ? firstModifiedPush.data.modified : null
                });
            }
            // return Promise.all([
            //     first => {
            //         return fetchPushesBasic({
            //             userId,
            //             access_token,
            //             // modified_after: firstModifiedPush ? firstModifiedPush.data.modified : null
            //         })
            //     },
            //     last => {
            //         // console.log('lastModifiedPush');
            //         // console.log(JSON.stringify(lastModifiedPush, null, 4));

            //         // console.log('lastUpdatedPush._id', lastUpdatedPush._id)
            //         // console.log('lastUpdatedPush.createdAt', lastUpdatedPush.createdAt)

            //         // console.log('lastUpdatedPush.pushBody', lastUpdatedPush.pushBody)
            //         // console.log(lastUpdatedPush.pushBody.modified)

            //         return fetchPushesBasic({
            //             userId,
            //             access_token,
            //             modified_after:
            //                 rebuild || !lastModifiedPush
            //                     ? null
            //                     : lastModifiedPush.data.modified
            //         });
            //     }
            // ])
        })
        .then(() => {
            console.log("fetchFreshPushbullets() done");
            return true;
        })
        .catch(err => {
            console.log("err in fetchFreshPushbullets");
            console.log(err);
            throw err;
        });
};

const parseUrlFromBookmarks = () => {
    return Bookmark.find({
        provider: "pushbullet",
        "data.url": { $exists: true },
        "stats.domain": { $exists: false }
    })
        .exec()
        .then(bookmarks => {
            return bookmarks.map(bk => {
                let { stats, data: { url } } = bk;

                if ("magnet" == url.substring(0, 5)) {
                    //TODO can consider if i wan to add them to some category in future
                    // for now do nothing
                } else {
                    bk
                        .update(
                            {
                                $set: {
                                    stats: Object.assign(
                                        {},
                                        stats,
                                        parseDomain(url)
                                    )
                                }
                            },
                            {
                                multi: false
                                // upsert: true,
                                // overwrite: true,
                            }
                        )
                        .exec();
                }
            });
        })
        .then(bookmarks => {
            return true;
        });
};

// fetchFreshPushbullets({
// 	userId: 1,
// 	access_token: process.env.PUSHBULLET_PERSONAL_ACCESS_TOKEN,
// 	rebuild: true
// })
// 	.then(pushbullets => {
// 		console.log(pushbullets);
// 		console.log('amt of pushes fetched:', pushbullets.length);
// 		// parseUrlFromBookmarks();
// 	})
// 	.catch(err => {
// 		throw err;
// 	});

// ==============================

const getMagicUncategorisedBookmarks = (params = {}) => {
    let { userId } = params;

    // let recently be 6 days, for now
    let recently = moment().format("X") - 24 * 60 * 60 * 10;

    return getPushbulletBookmarksQuery({
        query: {
            userId: new ObjectId(userId)
        },
        sort: {
            //.sort({ "data.modified": -1 }) //SORT DESC
        },
        options: {
            single: true
            // .or([{ status: undefined }, { status: "uncategorised" }])
            // .sort({ "stats.viewCount": -1 }) //SORT DESC
        }
    })
        .then(bookmarks => {
            let left = bookmarks.slice(0, Math.min(bookmarks.length, 4));
            let right = bookmarks.slice(
                Math.min(bookmarks.length, 4),
                bookmarks.length
            );

            return [].concat(
                left,
                _.shuffle(
                    right
                        .sort((a, b) => {
                            if (a.stats && b.stats) {
                                return b.stats.viewCount - a.stats.viewCount;
                            } else {
                                return 0;
                            }
                        })
                        .slice(10)
                ).slice(0, Math.min(right.length, 6))
            );
        })
        .then(bookmarks => {
            Promise.map(bookmarks, bk => {
                return bk
                    .update(
                        {
                            $inc: { "stats.viewCount": 1 }
                        },
                        {
                            multi: false
                            // upsert: true,
                            // overwrite: true,
                        }
                    )
                    .exec();
            });
            return bookmarks;
        })
        .then(bookmarks => {
            // console.log(bookmarks);
            // console.log(bookmarks.length);
            return bookmarks;
        });
};

const deletePush = iden => {
    return;

    return new Promise((resolve, reject) => {
        if (iden !== undefined) {
            asdasdasd;
        } else {
            resolve(null);
        }
    });
};

router.get("/", (req, res) => {
    let { type } = req.query;
    Promise.resolve()
        .then(() => {
            switch (type) {
                case "magic":
                    return getMagicUncategorisedBookmarks({
                        userId: req.user.id
                    });
                default:
                    return Bookmark.find({
                        userId: new ObjectId(req.user.id)
                    }).exec();
            }
        })
        .then(bookmarks => {
            console.log("bookmarks.length", bookmarks.length);
            res.json(bookmarks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something broke!");
        });
});

router.get("/fetch", (req, res) => {
    let { pushbullet } = req.user.providers;

    if (pushbullet) {
        fetchFreshPushbullets({
            userId: new ObjectId(req.user.id),
            access_token: pushbullet.access_token
        })
            // .then(() => parseUrlFromBookmarks())
            // .then(() =>
            //     Bookmark.find({
            //         userId: new ObjectId(req.user.id)
            //     }).exec()
            // )
            // .then(bookmarks => {
            //     // console.log('bookmarks.length', bookmarks.length);
            //     res.json(bookmarks);
            // })
            .catch(err => {
                console.log(err);
                res.status(500).send("Something broke!");
            });
    } else {
        return res.json([]);
    }

    //... and more sources in future
});

router.delete("/:id", (req, res) => {
    // console.log(req.query);
    // console.log(req.params);

    let { pushbullet } = req.user.providers;

    Bookmark.findById(req.params.id)
        .exec()
        .then(bk => {
            if (bk) {
                switch (bk.provider) {
                    case "pushbullet": {
                        return PB_API({
                            method: "delete",
                            url: "/pushes/" + bk.data.iden,
                            headers: {
                                "Access-Token": pushbullet.access_token
                            }
                        })
                            .then(res => {
                                if (res.status === 200) {
                                    return bk.remove();
                                }
                                res.sendStatus(200);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send("Something broke!");
                            });
                    }
                }
            }
        });
});

module.exports = {
    router,
    getMagicUncategorisedBookmarks,
    fetchFreshPushbullets
};
