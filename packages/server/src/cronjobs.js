const schedule = require('node-schedule')
const Promise = require('bluebird')
const ObjectId = require('mongoose').Types.ObjectId
const { User } = require('./models/user')

const { fetchFreshPushbullets } = require('./api/bookmarks')

// const job = schedule.scheduleJob('0,30 * * * *', function () {
//   // const job = schedule.scheduleJob('* * * * *', function() {
//   const users = User.find({})
//   Promise.mapSeries(users, async ({ _id, providers }) => {
//     try {
//       await fetchFreshPushbullets({
//         userId: _id,
//         access_token: providers.pushbullet.access_token,
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   })
// })
