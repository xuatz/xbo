import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:8080/v1/graphql'
export const client = new GraphQLClient(endpoint, { headers: {} })
