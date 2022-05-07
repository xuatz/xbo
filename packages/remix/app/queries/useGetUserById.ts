import { client, QueryUser, Users } from 'common'
import { useQuery } from 'react-query'
import { QUERY_KEYS } from './constants'
import { keyBy } from 'lodash'

function massageUserData(data: Pick<Users, 'id' | 'providers'>) {
  return {
    id: data?.id,
    providers: keyBy(
      data?.providers.map((provider) => {
        return {
          name: provider?.provider?.name,
          token: provider?.token,
        }
      }),
      'name',
    ),
  }
}

export const useGetUserById = ({
  variables,
}: {
  variables: { id: string }
}) => {
  return useQuery([QUERY_KEYS.GET_USER_BY_ID, variables], async () => {
    if (!variables.id) {
      return undefined
    }

    const res = await client.request(QueryUser, variables)

    if (res.users.length === 0) {
      return undefined
    }

    return massageUserData(res.users[0])
  })
}
