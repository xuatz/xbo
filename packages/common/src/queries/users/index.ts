import { gql } from '@apollo/client'

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
  mutation MutationInsertUserProvidersOne($userId: uuid!, $token: String!) {
    insert_userProviders_one(
      object: {
        userId: $userId
        providerId: "7bc2a47c-d98c-44f1-98c6-a1a9e6469924"
        token: $token
      }
    ) {
      userId
      providerId
      token
    }
  }
`
