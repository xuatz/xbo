import * as supertokens from 'supertokens-node'
import * as Session from 'supertokens-node/recipe/session'
import * as EmailPassword from 'supertokens-node/recipe/emailpassword'
import {
  middleware as supertokenMiddleware,
  errorHandler as supertokenErrorHandler,
} from 'supertokens-node/framework/express'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'

supertokens.init({
  framework: 'express',
  supertokens: {
    connectionURI: 'https://someone.xuatz.com',
  },
  appInfo: {
    appName: 'xbo-dev',
    apiDomain: 'localhost:9000',
    websiteDomain: 'localhost:3000',
  },
  recipeList: [EmailPassword.init(), Session.init()],
})

export {
  supertokens,
  supertokenMiddleware,
  supertokenErrorHandler,
  verifySession,
  Session,
}
