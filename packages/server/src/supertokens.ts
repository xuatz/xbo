import { MutationInsertUsersOne } from 'common'
import * as Supertokens from 'supertokens-node'
import * as EmailPassword from 'supertokens-node/recipe/emailpassword'
import * as Session from 'supertokens-node/recipe/session'
import { client } from './graphql'

async function saveSuperTokenUserIdToHasura(id: string) {
  const variables = { id }
  await client.request(MutationInsertUsersOne, variables)
}

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
    EmailPassword.init({
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            // signInPOST: async function (input) {
            //   console.log('xz:signInPOST')

            //   if (originalImplementation.signInPOST === undefined) {
            //     throw Error('Should never come here')
            //   }

            //   // First we call the original implementation of signInPOST.
            //   let response = await originalImplementation.signInPOST(input)

            //   // Post sign up response, we check if it was successful
            //   if (response.status === 'OK') {
            //     let { id, email } = response.user

            //     // These are the input form fields values that the user used while signing in
            //     let formFields = input.formFields
            //     // TODO: post sign in logic
            //   }
            //   return response
            // },
            signUpPOST: async function (input) {
              if (originalImplementation.signUpPOST === undefined) {
                throw Error('Should never come here')
              }

              // First we call the original implementation of signUpPOST.
              let response = await originalImplementation.signUpPOST(input)

              // Post sign up response, we check if it was successful
              if (response.status === 'OK') {
                let { id } = response.user

                await saveSuperTokenUserIdToHasura(id)
              }
              return response
            },
          }
        },
      },
    }),
    Session.init({
      jwt: {
        enable: true,
      },
    }),
  ],
})
