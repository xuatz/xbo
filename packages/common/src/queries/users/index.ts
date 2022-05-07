import { gql } from 'graphql-request'

export const QueryUser = gql`
  query QueryUser($id: uuid) {
    users(where: { id: { _eq: $id } }) {
      id
      providers {
        provider {
          name
        }
        token
      }
    }
  }
`

export const MutationInsertUsersOne = gql`
  mutation InsertUsersOne($id: uuid!) {
    insert_users_one(object: { id: $id }) {
      id
    }
  }
`

export const MutationInsertUserProvidersOne = gql`
  mutation MutationInsertUserProvidersOne(
    $userId: uuid!
    $providerId: uuid!
    $token: String!
  ) {
    insert_userProviders_one(
      object: { userId: $userId, providerId: $providerId, token: $token }
      on_conflict: { constraint: userProviders_pkey, update_columns: [token] }
    ) {
      userId
      providerId
      token
    }
  }
`
