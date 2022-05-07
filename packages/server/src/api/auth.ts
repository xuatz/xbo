import axios, { AxiosError } from 'axios'
import { MutationInsertUserProvidersOne, client } from 'common'
import * as express from 'express'
import * as Session from 'supertokens-node/recipe/session'
import * as SessionExpress from 'supertokens-node/recipe/session/framework/express'
import { PUSHBULLET_PROVIDER_ID } from '../constants'

const router = express.Router()

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

    // @todo may want to reconsider in future if i want to make the distinction of token type
    const variables = {
      userId: sessionData?.getUserId(),
      providerId: PUSHBULLET_PROVIDER_ID,
      token: response?.data?.access_token,
    }
    await client.request(MutationInsertUserProvidersOne, variables)
    return res.redirect('http://localhost:3000/profile')
  },
)

export default router
