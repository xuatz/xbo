const supertokens = require('supertokens-node')
const Session = require('supertokens-node/recipe/session')
const EmailPassword = require('supertokens-node/recipe/emailpassword')

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

module.exports = { supertokens }
