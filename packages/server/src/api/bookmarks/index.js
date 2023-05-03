const express = require('express');
const router = express.Router();

const _ = require('lodash');
const axios = require('axios');
const Promise = require('bluebird');
const parseDomain = require('parse-domain');
const moment = require('moment');

const Bookmark = require('../../models/bookmark');
const ObjectId = require('mongoose').Types.ObjectId;

const { fetchFreshPushbullets } = require('./fetchFreshPushbullets');
const {
  getPushbulletBookmarksQuery,
} = require('./getPushbulletBookmarksQuery');

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

const PB_API = axios.create({
  baseURL: 'https://api.pushbullet.com/v2/',
});

// ==============================

const _parseUrlFromBookmarks = () => {
  return Bookmark.find({
    provider: 'pushbullet',
    'data.url': { $exists: true },
    'stats.domain': { $exists: false },
  })
    .exec()
    .then((bookmarks) => {
      return bookmarks.map((bk) => {
        let {
          stats,
          data: { url },
        } = bk;

        if ('magnet' == url.substring(0, 5)) {
          //TODO can consider if i wan to add them to some category in future
          // for now do nothing
        } else {
          bk.update(
            {
              $set: {
                stats: Object.assign({}, stats, parseDomain(url)),
              },
            },
            {
              multi: false,
              // upsert: true,
              // overwrite: true,
            }
          ).exec();
        }
      });
    })
    .then((_bookmarks) => {
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
  let _recently = moment().format('X') - 24 * 60 * 60 * 10;

  return (
    getPushbulletBookmarksQuery({
      userId: new ObjectId(userId),
    })
      .sort({ 'data.modified': -1 })
      // .sort({ "stats.viewCount": -1 }) //SORT DESC
      .or([{ status: undefined }, { status: 'uncategorised' }])
      .exec()
      .then((bookmarks) => {
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
      .then((bookmarks) => {
        Promise.map(bookmarks, (bk) => {
          return bk
            .update(
              {
                $inc: { 'stats.viewCount': 1 },
              },
              {
                multi: false,
                // upsert: true,
                // overwrite: true,
              }
            )
            .exec();
        });
        return bookmarks;
      })
      .then((bookmarks) => {
        // console.log(bookmarks);
        // console.log(bookmarks.length);
        return bookmarks;
      })
  );
};

router.get('/', async (req, res, next) => {
  const { user, query } = req;
  const { type, before } = query;

  if (!user) {
    return next(new Error('You are not logged in.'));
  }

  let retrieveBookmarks;
  switch (type) {
    case 'magic':
      retrieveBookmarks = () =>
        getMagicUncategorisedBookmarks({
          userId: req.user.id,
        });
      break;
    default:
      if (!before) {
        retrieveBookmarks = () =>
          Bookmark.find({
            userId: new ObjectId(user.id),
          })
            .sort({ 'data.modified': -1 })
            .limit(20)
            .exec();
      } else {
        retrieveBookmarks = () =>
          Bookmark.find({
            'data.modified': { $lte: before },
          })
            .sort('-createdOn')
            .limit(20)
            .exec();
      }
  }

  try {
    let bookmarks = await retrieveBookmarks();
    console.log('bookmarks.length', bookmarks.length);
    res.json(bookmarks);
  } catch (err) {
    console.log(err);
    return next(new Error('Something broke!'));
  }
});

const deletePushBullet = (bk, pushbullet) => {
  return PB_API({
    method: 'delete',
    url: '/pushes/' + bk.data.iden,
    headers: {
      'Access-Token': pushbullet.access_token,
    },
  })
    .then((pb_res) => {
      if (pb_res.status === 200) {
        return true;
      } else {
        console.log(pb_res);
        return false;
      }
    })
    .catch((err) => {
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
    });
};

router.delete('/:id', async (req, res) => {
  let { pushbullet } = req.user.providers;
  try {
    let bk = await Bookmark.findById(req.params.id).exec();
    let isDeleted = false;
    if (bk) {
      if (bk.provider === 'pushbullet') {
        isDeleted = deletePushBullet(bk, pushbullet);
      }
    }

    if (isDeleted) {
      bk.remove();
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something broke!');
  }
});

router.put('/:id/tags', async (req, res) => {
  const bookmarkId = req.params.id;
  const tags = req.body.tags;

  try {
    const _result = await Bookmark.updateOne(
      { _id: bookmarkId },
      {
        $set: {
          tags: tags,
        },
      }
    );
    const updatedBookmark = await Bookmark.findById(bookmarkId).exec();
    res.status(200).json(updatedBookmark);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/all', async (req, res, _next) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: new ObjectId(req.user.id),
    }).exec();
    res.json(bookmarks);
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

router.get('/fetch', async (req, res, _next) => {
  const pushbullet = req?.user?.providers?.pushbullet;

  try {
    fetchFreshPushbullets({
      userId: new ObjectId(req.user.id),
      access_token: pushbullet.access_token,
      rebuild: !!req.query.rebuild,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = {
  router,
  getMagicUncategorisedBookmarks,
  fetchFreshPushbullets,
};
