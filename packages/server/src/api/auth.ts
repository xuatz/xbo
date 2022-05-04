import axios, { AxiosError } from 'axios'
import { MutationInsertUserProvidersOne } from 'common'
import * as express from 'express'
import * as EmailPassword from 'supertokens-node/recipe/emailpassword'
import * as Session from 'supertokens-node/recipe/session'
import * as SessionExpress from 'supertokens-node/recipe/session/framework/express'
import { client } from '../graphql'
import { User } from '../models/user'

const router = express.Router()
// const passport = require('passport')
// const BasicStrategy = require('passport-http').BasicStrategy

// const loginTasks = (req, res) => {
//   let providers = {}
//   if (req.user && req.user.providers) {
//     Object.keys(req.user.providers).map((key) => {
//       if (req.user.providers[key]) {
//         providers[key] = true
//       }
//     })
//   }
//   res.send({
//     providers,
//   })
// }

// passport.use(
//   'local-signup',
//   new BasicStrategy((username, password, done) => {
//     if (!username) {
//       return done(null, false, { message: 'No username provided' })
//     }

//     if (!password) {
//       return done(null, false, { message: 'No password provided' })
//     }

//     User.findOne(
//       {
//         username: username,
//       },
//       '-password'
//     )
//       .exec()
//       .then((user) => {
//         if (user) {
//           console.log('Username already taken')
//           return done(null, false, {
//             message: 'Username already taken',
//           })
//         }

//         return User.create({
//           username,
//           password,
//         })
//       })
//       .then((newUser) => {
//         // console.log('newUser', newUser)
//         // console.log('newUser._id', newUser._id)
//         // console.log('newuser._id', newuser._id)
//         return User.findOne(newUser._id, '-password').exec()
//       })
//       .then((newUser) => {
//         return done(null, newUser)
//       })
//       .catch((err) => {
//         return done(err)
//       })
//   })
// )

// passport.use(
//   'local-login',
//   new BasicStrategy((username, password, done) => {
//     if (!username) {
//       return done(null, false, { message: 'No username provided' })
//     }

//     if (!password) {
//       return done(null, false, { message: 'No password provided' })
//     }

//     User.findOne({
//       username: username,
//     })
//       .exec()
//       .then((user) => {
//         if (!user) {
//           return done(null, false, {
//             message: 'No user found',
//           })
//         } else {
//           user.comparePassword(password, (err, isMatch) => {
//             if (err) {
//               return done(err)
//             }

//             if (isMatch) {
//               return done(null, user)
//             } else {
//               return done(null, false, {
//                 message: 'Password is wrong',
//               })
//             }
//           })
//         }
//       })
//       .catch((err) => {
//         return done(err)
//       })
//   })
// )

// router.get('/user', (req, res) => {
//   // console.log('req.session', req.session);
//   // console.log('req.session.cookie', req.session.cookie);
//   // console.log('req.session.id', req.session.id);
//   // console.log('req.sessionID', req.sessionID);
//   // console.log('req.user', req.user);
//   if (req.user) {
//     loginTasks(req, res)
//   } else {
//     res.sendStatus(401)
//   }
// })

// router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
//   // console.log("req.session", req.session);
//   // console.log('req.session.cookie', req.session.cookie);
//   // console.log('req.session.id', req.session.id);
//   // console.log('req.sessionID', req.sessionID);
//   // console.log(req.user);
//   res.sendStatus(200)
// })

// router.post('/login', passport.authenticate('local-login'), (req, res) => {
//   loginTasks(req, res)
// })

// router.get('/logout', (req, res) => {
//   req.logout()
//   res.sendStatus(200)
// })

// ======

router.get(
  '/connect/pushbullet/callback',
  SessionExpress.verifySession(),
  async (req, res) => {
    let response
    try {
      response = await axios.post('https://api.pushbullet.com/oauth2/token', {
        grant_type: 'authorization_code',
        client_id: process.env.PUSHBULLET_APP_CLIENT_ID,
        client_secret: process.env.PUSHBULLET_APP_CLIENT_SECRET,
        code: req.query.code,
      })
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      } else {
        // Just a stock error
        console.log(error)
      }
    }

    const sessionData = await Session.getSession(req, res)

    console.log('sessionData?.getAccessToken()', sessionData?.getAccessToken())
    console.log('sessionData?.getUserId()', sessionData?.getUserId())

    // const SessionInformation = await Session.getSessionInformation(req, res)
    // console.log('SessionInformation', SessionInformation)

    // const userId = req.session.userId
    // // You can learn more about the `User` object over here https://github.com/supertokens/core-driver-interface/wiki
    // const userInfo = await EmailPassword.getUserById(userId)

    // console.log('userInfo', userInfo)

    console.log('xz:response.data', response?.data)

    // @todo may want to reconsider in future if i want to make the distinction of token type
    const variables = {
      userId: sessionData?.getUserId(),
      token: response?.data?.access_token,
    }
    await client.request(MutationInsertUserProvidersOne, variables)

    return res.redirect('http://localhost:3000/profile')
  },
)

export default router
