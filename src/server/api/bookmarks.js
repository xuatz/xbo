const express = require('express');
const router = express.Router();

const _ = require('lodash');
const axios = require('axios');
const Promise = require('bluebird');
const parseDomain = require('parse-domain');
const moment = require('moment');

const Bookmark = require('../models/bookmark.js');
const ObjectId = require('mongoose').Types.ObjectId;

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
          provider: 'pushbullet'
        })
      )
    : Bookmark.find(
        Object.assign({}, rest, {
          provider: 'pushbullet'
        })
      );
};

// ==============================

const PB_API = axios.create({
  baseURL: 'https://api.pushbullet.com/v2/'
});

// ==============================

let isFetchingFreshPushbullets = false;
async function fetchFreshPushbullets(params) {
  console.log('fetchFreshPushbullets()');
  console.log('isFetchingFreshPushbullets', isFetchingFreshPushbullets);
  if (isFetchingFreshPushbullets) {
    const error = new Error('fetchFreshPushbullets() is already running');
    error.code = 1001;
    throw error;
  }

  try {
    isFetchingFreshPushbullets = true;

    let { userId, access_token, rebuild = false } = params;
    console.log('hi301');

    const lastModifiedPush = await getPushbulletBookmarksQuery({
      userId: new ObjectId(userId),
      singleRecord: true
    })
      .sort({ 'data.modified': -1 }) //SORT DESC
      .exec();

    console.log('hi302');
    const newPushes = await fetchPushesBasic({
      access_token,
      modified_after:
        rebuild || !lastModifiedPush ? null : lastModifiedPush.data.modified
    });
    console.log('hi303');
    if (newPushes && newPushes.length > 0) {
      return Promise.map(newPushes, newPush => {
        //TODO xz: ideally should also check if modified is < newPush.modified
        return Bookmark.findOneAndUpdate(
          {
            provider: 'pushbullet',
            'data.iden': newPush.iden
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
  } catch (err) {
    console.log('hi21');
    isFetchingFreshPushbullets = false;
    throw err;
  } finally {
    console.log('hi22');
    isFetchingFreshPushbullets = false;
    // setTimeout(function() {
    //   isFetchingFreshPushbullets = false;
    // }, 5000);
  }
}

const fetchPushesBasic = params => {
  const demoLimit = 2;

  let {
    access_token,
    cursor = null,
    pushes = [],
    modified_after = null,
    count = 1
  } = params;

  console.log('fetchPushesBasic():count:', count);

  return PB_API.request({
    url: '/pushes',
    headers: {
      'Access-Token': access_token
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

      console.log('newPushes.length', newPushes.length);

      let mergedPushes = pushes.concat(newPushes);

      // if (nextCursor && count < demoLimit) {
      if (nextCursor) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchPushesBasic({
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
    provider: 'pushbullet',
    'data.url': { $exists: true },
    'stats.domain': { $exists: false }
  })
    .exec()
    .then(bookmarks => {
      return bookmarks.map(bk => {
        let {
          stats,
          data: { url }
        } = bk;

        if ('magnet' == url.substring(0, 5)) {
          //TODO can consider if i wan to add them to some category in future
          // for now do nothing
        } else {
          bk.update(
            {
              $set: {
                stats: Object.assign({}, stats, parseDomain(url))
              }
            },
            {
              multi: false
              // upsert: true,
              // overwrite: true,
            }
          ).exec();
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
  let recently = moment().format('X') - 24 * 60 * 60 * 10;

  return (
    getPushbulletBookmarksQuery({
      userId: new ObjectId(userId)
    })
      .sort({ 'data.modified': -1 })
      // .sort({ "stats.viewCount": -1 }) //SORT DESC
      .or([{ status: undefined }, { status: 'uncategorised' }])
      .exec()
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
                $inc: { 'stats.viewCount': 1 }
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
      })
  );
};

router.get('/', async (req, res, next) => {
  const { user, query } = req;

  if (!user) {
    return next(new Error('You are not logged in.'));
  }
  let { type, before } = query;
  try {
    const bookmarks = await Promise.resolve().then(() => {
      switch (type) {
        case 'magic':
          return getMagicUncategorisedBookmarks({
            userId: user.id
          });
        default:
          if (!before) {
            return Bookmark.find({
              userId: new ObjectId(user.id)
            })
              .sort({ 'data.modified': -1 })
              .limit(20)
              .exec();
          } else {
            return Bookmark.find({
              'data.modified': { $lte: before }
            })

              .sort('-createdOn')
              .limit(20)
              .exec()
          }   
      }
    });

    console.log('bookmarks.length', bookmarks.length);
    res.json(bookmarks);
  } catch (err) {
    console.log(err);
    return next(new Error('Something broke!'));
  }
});

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

router.delete('/:id', (req, res) => {
  let { pushbullet } = req.user.providers;
  
  Bookmark.findById(req.params.id)
    .exec()
    .then(bk => {
      if (bk) {
        switch (bk.provider) {
          case 'pushbullet': {
            return PB_API({
              method: 'delete',
              url: '/pushes/' + bk.data.iden,
              headers: {
                'Access-Token': pushbullet.access_token
              }
            })
              .then(pb_res => {
                if (pb_res.status === 200) {
                  return true;
                } else {
                  console.log(pb_res);
                  return false;
                }
              })
              .catch(err => {
                switch (err.response.status) {
                  case 404:
                    // probably deleted elsewhere like on another client
                    // or on pushbullet itself
                    return true;
                  default: {
                    console.error(err);
                    console.log(err.response.status);
                    console.log(err.response.statusText);
                    console.log(err.response.data);
                    return false;
                  }
                }
              })
              .then(isDeleted => {
                if (isDeleted) {
                  bk.remove();
                  res.sendStatus(200);
                } else {
                  res.sendStatus(400);
                }
              })
              .catch(err => {
                console.log(err);
                res.status(500).send('Something broke!');
              });
          }
        }
      }
    });
});

router.get('/fetch', async (req, res, next) => {
  //xz: may include many sources in future
  if (!req.user.providers) {
    return res.json([]);
  }

  let { pushbullet } = req.user.providers;

  try {
    if (pushbullet) {
      await fetchFreshPushbullets({
        userId: new ObjectId(req.user.id),
        access_token: pushbullet.access_token
      });
      // await parseUrlFromBookmarks();
      const bookmarks = await Bookmark.find({
        userId: new ObjectId(req.user.id)
      }).exec();
      res.json(bookmarks);
    } else {
      return res.json([]);
    }
    //... and more sources in future
  } catch (err) {
    switch (err.code) {
      case 1001:
        console.log(err.message);
        break;
      default:
        console.log(err);
    }
    res.status(500).send(err.message);
  }
});

module.exports = {
  router,
  getMagicUncategorisedBookmarks,
  fetchFreshPushbullets
};
