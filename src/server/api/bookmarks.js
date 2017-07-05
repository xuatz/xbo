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
        ? Bookmark.findOne(
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

const pushbullet = axios.create({
    baseURL: "https://api.pushbullet.com/v2/"
});

// ==============================

const fetchFreshPushbullets = params => {
    console.log("fetchFreshPushbullets()");
    let { userId, access_token, rebuild = false } = params;

    return getPushbulletBookmarksQuery({
        userId: new ObjectId(userId),
        singleRecord: true
    })
        .sort({ "data.modified": -1 }) //SORT DESC
        .exec()
        .then(lastModifiedPush => {
            // console.log('lastModifiedPush');
            // console.log(JSON.stringify(lastModifiedPush, null, 4));

            // console.log('lastUpdatedPush._id', lastUpdatedPush._id)
            // console.log('lastUpdatedPush.createdAt', lastUpdatedPush.createdAt)

            // console.log('lastUpdatedPush.pushBody', lastUpdatedPush.pushBody)
            // console.log(lastUpdatedPush.pushBody.modified)

            return fetchPushesBasic2({
                access_token,
                modified_after: rebuild || !lastModifiedPush
                    ? null
                    : lastModifiedPush.data.modified
            });
        })
        .catch(err => {
            console.log(err);
            console.log("============================");
            console.error(err.stack);
        })
        .then(newPushes => {
            if (newPushes && newPushes.length > 0) {
                return Promise.map(newPushes, newPush => {
                    //TODO xz: ideally should also check if modified is < newPush.modified
                    return Bookmark.findOneAndUpdate(
                        {
                            provider: "pushbullet",
                            "data.iden": newPush.iden
                        },
                        {
                            $set: {
                                userId,
                                data: newPush
                            }
                        },
                        {
                            upsert: true
                        }
                    ).exec();
                });
            }
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

const fetchPushesBasic2 = params => {
    const demoLimit = 2;

    let {
        access_token,
        cursor = null,
        pushes = [],
        modified_after = null,
        count = 1
    } = params;

    console.log("fetchPushesBasic2():count:", count);

    return pushbullet
        .request({
            url: "/pushes",
            headers: {
                "Access-Token": access_token
            },
            params: {
                active: true,
                cursor,
                modified_after
            }
        })
        .then(res => {
            let { status, statusText, data } = res;
            let newPushes = data.pushes;
            let nextCursor = data.cursor;

            console.log("newPushes.length", newPushes.length);

            let mergedPushes = pushes.concat(newPushes);

            // if (nextCursor && count < demoLimit) {
            if (nextCursor) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        fetchPushesBasic2({
                            access_token,
                            cursor: nextCursor,
                            pushes: mergedPushes,
                            count: ++count,
                            modified_after
                        })
                            .then(resolve)
                            .catch(reject);
                    }, 10000);
                });
            } else {
                return mergedPushes;
            }
        })
        .catch(err => {
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

router.get("/fetch", (req, res) => {
    //xz: may include many sources in future

    let { pushbullet } = req.user.accounts;

    if (pushbullet) {
        fetchFreshPushbullets({
            userId: new ObjectId(req.user.id),
            access_token: pushbullet.access_token
        })
            .then(() => parseUrlFromBookmarks())
            .then(() =>
                Bookmark.find({
                    userId: new ObjectId(req.user.id)
                }).exec()
            )
            .then(bookmarks => {
                // console.log('bookmarks.length', bookmarks.length);
                res.json(bookmarks);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("Something broke!");
            });
    } else {
        return res.json([]);
    }

    //... and more sources in future
});

const getMagicUncategorisedBookmarks = (params = {}) => {
    let { userId } = params;

    // let recently be 6 days for now
    let recently = moment().format("X") - 24 * 60 * 60 * 10;

    return (
        Bookmark.find({
            userId: new ObjectId(userId)
        })
            // .where("data.created")
            // .gte(recently)
            .sort({ "data.created": "desc" })
            .or([{ status: undefined }, { status: "uncategorised" }])
            // .where("status")
            // .equals(undefined)
            .limit(50)
            .exec()
            .then(bookmarks => {
                // console.log("woohoo2");
                // console.log(bookmarks);
                console.log(bookmarks.length);
                return bookmarks;
            })
            .then(bookmarks => {
                let left = bookmarks.slice(0, Math.min(bookmarks.length, 4));
                let right = bookmarks.slice(
                    Math.min(bookmarks.length, 4),
                    bookmarks.length
                );

                // console.log("left.length", left.length);
                // console.log("right.length", right.length);

                // left.forEach(bk => {
                //     // console.log(bk.createdAt);
                //     console.log(bk.data);
                //     console.log(bk.data.created);
                // });

                return [].concat(
                    left,
                    _.shuffle(right).slice(0, Math.min(right.length, 6))
                );
            })
            .then(bookmarks => {
                console.log(bookmarks);
                console.log(bookmarks.length);
                return bookmarks;
            })
    );
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
            // console.log('bookmarks.length', bookmarks.length);
            res.json(bookmarks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something broke!");
        });
});

module.exports = {
    router,
    getMagicUncategorisedBookmarks
};
