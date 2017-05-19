const express = require('express');
const router = express.Router();

const _ = require('lodash');
const axios = require('axios');
const Promise = require('bluebird');
const parseDomain = require('parse-domain');

const Bookmark = require('../models/bookmark.js');

// ==============================

const pushbullet = axios.create({
	baseURL: process.env.PUSHBULLET_API_URL || 'https://api.pushbullet.com/v2/'
	// headers: {
	// 	'Access-Token': PUSHBULLET_PERSONAL_ACCESS_TOKEN
	// }
});

router.get('/bookmarks', (req, res) => {
	Bookmark.find(
		{
			// userId
		}
	)
		.exec()
		.then(bookmarks => {
			res.json(bookmarks);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Something broke!');
		});
});

// ==============================

router.use((req, res, next) => {
	console.log('api/bookmark.js', 'den run me next');
	if (req.user) {
		res.sendStatus(401);
	} else {
		next();
	}
});

router.get('/bookmarks/fetch', (req, res) => {
	//xz: may include many sources in future

	//xz: should fetch based on logged in user
	getPushbullets(
		{
			// userId: req.user.id,
		}
	)
		.then(bookmarks => {
			res.json(bookmarks);
		})
		.catch(err => {
			res.status(500).send('Something broke!');
		});
});

// ==============================

//TODO rename function during merge
const getBookmarks = params => {
	let { userId, rebuild = false } = params;

	return Bookmark.findOne(
		{
			// userId
		}
	)
		.sort({ 'pushBody.modified': -1 }) //SORT DESC
		.exec()
		.then(lastUpdatedPush => {
			// console.log('lastUpdatedPush')
			// console.log(JSON.stringify(lastUpdatedPush, null, 4))

			// console.log('lastUpdatedPush._id', lastUpdatedPush._id)
			// console.log('lastUpdatedPush.createdAt', lastUpdatedPush.createdAt)

			// console.log('lastUpdatedPush.pushBody', lastUpdatedPush.pushBody)
			// console.log(lastUpdatedPush.pushBody.modified)

			return fetchPushesBasic2({
				modified_after: rebuild
					? null
					: lastUpdatedPush ? lastUpdatedPush.pushBody.modified : null
			});
		})
		.catch(err => {
			console.log(err);
			console.log('============================');
			console.error(err.stack);
		})
		.then(newPushes => {
			if (newPushes && newPushes.length > 0) {
				return Promise.map(newPushes, freshPush => {
					return Bookmark.findOneAndUpdate(
						{
							'pushBody.iden': freshPush.iden
						},
						{
							$set: {
								// userId,
								pushBody: freshPush
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
			return Bookmark.find(
				{
					// userId
				}
			).exec();
		})
		.then(bookmarks => {
			console.log('getBookmarks() done');
			return bookmarks;
		})
		.catch(err => {
			console.log(err);
			console.log('============================');
			console.error(err.stack);

			throw err;
		});
};

const fetchPushesBasic2 = params => {
	let { cursor = null, pushes = [], modified_after = null, count = 0 } = params;

	console.log('fetchPushesBasic2():count:', count);

	return pushbullet
		.get('pushes', {
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

			let mergedPushes = pushes.concat(newPushes);

			if (nextCursor) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						fetchPushesBasic2({
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

// getBookmarks({
//     userId: 1,
//     rebuild: false,
// })
//     .then(res => {
//         console.log('amt of pushes fetched:', res.length);
//     })
//     .catch(err => {
//         throw err;
//     });

const parseUrlFromBookmarks = () => {
	Bookmark.find({
		'pushBody.url': { $exists: true },
		'stats.domain': { $exists: false }
	})
		.exec()
		.then(bookmarks => {
			return bookmarks.map(bk => {
				let { stats, pushBody: { url } } = bk;

				if ('magnet' == url.substring(0, 5)) {
					//TODO can consider if i wan to add them to some category in future
					// for now do nothing
				} else {
					bk
						.update(
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
						)
						.exec();
				}
			});
		})
		.then(() => {
			console.log('done');
		});
};

parseUrlFromBookmarks();

module.exports = router;
