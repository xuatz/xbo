// 'use strict';

// require('dotenv').config();
const express = require('express');
const router = express.Router();

const _ = require('lodash');
const axios = require('axios');
const Promise = require('bluebird');

const Bookmark = require('../models/bookmark.js');

// ==============================

const baseUrl = 'https://api.pushbullet.com/v2/';
const PUSHBULLET_PERSONAL_ACCESS_TOKEN = process.env.PUSHBULLET_PERSONAL_ACCESS_TOKEN;

const pushbullet = axios.create({
    baseURL: baseUrl,
    headers: {
        'Access-Token': PUSHBULLET_PERSONAL_ACCESS_TOKEN,
    },
});

// ==============================

router.use((req, res, next) => {
    console.log('warehouse route generic check!');

    if (req.method === 'OPTIONS') {
        next();
    } else {
        // if (redisReady) {
        //  next();
        // } else {
        //  res.statusCode = 500;
        //  res.send('Redis not ready');
        // }
        next();
    }
});

router.get('/pushes', (req, res) => {
    getPushesFinal(
        {
            // userId: req.user.id,
        }
    )
        .then(pushes => {
            res.json(pushes);
        })
        .catch(err => {
            res.status(500).send('Something broke!');
        });
});

// ==============================

//TODO rename function during merge
const getPushesFinal = params => {
    let { userId, rebuild = false } = params;

    return (
        Bookmark.findOne(
            {
                // userId
            }
        )
            // .sort({ modified: -1 }) //SORT DESC
            // .exec()
            // .then(lastUpdatedPush => {
            //     // console.log('lastUpdatedPush')
            //     // console.log(JSON.stringify(lastUpdatedPush, null, 4))

            //     // console.log('lastUpdatedPush._id', lastUpdatedPush._id)
            //     // console.log('lastUpdatedPush.createdAt', lastUpdatedPush.createdAt)

            //     // console.log('lastUpdatedPush.pushBody', lastUpdatedPush.pushBody)
            //     // console.log(lastUpdatedPush.pushBody.modified)

            //     return fetchPushesBasic2({
            //         modified_after: rebuild
            //             ? null
            //             : lastUpdatedPush
            //                   ? lastUpdatedPush.pushBody.modified
            //                   : null,
            //     });
            // })
            // .catch(err => {
            //     console.log(err);
            //     console.log('============================');
            //     console.error(err.stack);
            // })
            // .then(newPushes => {
            //     if (newPushes && newPushes.length > 0) {
            //         return Promise.map(newPushes, freshPush => {
            //             return Bookmark.findOneAndUpdate(
            //                 {
            //                     'pushBody.iden': freshPush.iden,
            //                 },
            //                 {
            //                     $set: {
            //                         // userId,
            //                         pushBody: freshPush,
            //                     },
            //                 },
            //                 {
            //                     upsert: true,
            //                 }
            //             ).exec();
            //         });
            //     }
            // })
            .then(() => {
                return Bookmark.find(
                    {
                        // userId
                    }
                ).exec();
            })
            .then(pushes => {
                return pushes;
            })
            .catch(err => {
                console.log(err);
                console.log('============================');
                console.error(err.stack);

                throw err;
            })
    );
};

const fetchPushesBasic2 = params => {
    let {
        cursor = null,
        pushes = [],
        modified_after = null,
        count = 0,
    } = params;

    console.log('fetchPushesBasic2():count:', count);

    return pushbullet
        .get('pushes', {
            params: {
                active: true,
                cursor,
                modified_after,
            },
        })
        .then(res => {
            let { status, statusText, data } = res;
            let newPushes = data.pushes;
            let nextCursor = data.cursor;

            let mergedPushes = pushes.concat(newPushes);

            if (nextCursor) {
                return new Promise((resolve, reject) => {
                    setTimeout(
                        () => {
                            fetchPushesBasic2({
                                cursor: nextCursor,
                                pushes: mergedPushes,
                                count: ++count,
                                modified_after,
                            })
                                .then(resolve)
                                .catch(reject);
                        },
                        10000
                    );
                });
            } else {
                return mergedPushes;
            }
        })
        .catch(err => {
            throw err;
        });
};

// getPushesFinal({
//     userId: 1,
//     rebuild: false,
// })
//     .then(res => {
//         console.log('amt of pushes fetched:', res.length);
//     })
//     .catch(err => {
//         throw err;
//     });

module.exports = router;
