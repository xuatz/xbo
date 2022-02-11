import * as Supertokens from 'supertokens-node'
import * as Session from 'supertokens-node/recipe/session'
import * as EmailPassword from 'supertokens-node/recipe/emailpassword'

Supertokens.init({
  framework: 'express',
  supertokens: {
    connectionURI: 'https://someone.xuatz.com',
  },
  appInfo: {
    appName: 'xbo-dev',
    apiDomain: 'localhost:9000',
    websiteDomain: 'localhost:3000',
  },
  recipeList: [
    EmailPassword.init(),
    Session.init({
      jwt: {
        enable: true,
      }
    }),
  ],
})
