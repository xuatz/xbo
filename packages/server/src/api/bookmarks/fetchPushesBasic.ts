import { GET_PUSHES_PARAMS, getPushes } from './getPushes'
import { request, gql } from 'graphql-request'
// import ... from '@xbo/prisma-client'

const endpoint = 'http://localhost:8080/v1/graphql'

export type FetchPushesBasicParams = GET_PUSHES_PARAMS & {
  userId: string
  pushes?: unknown[]
  count?: number // @todo rename to runCount
  emptyCount?: number
  ttl?: number
  dryRun?: boolean
}

function getPushesCursorByUserId(userId: string) {
  if (!userId) {
    return undefined
  }

  // @todo
  return undefined
}

async function savePushesToHasura({
  pushes,
  userId,
  cursor,
}: Partial<FetchPushesBasicParams>) {
  const {
    posts: { data },
  } = await request(
    endpoint,
    gql`
      mutation MyMutation {
        insert_pushbullets(
          objects: [
            { data: { age: 123 }, id: "1", userId: "" }
            { data: "", id: "", userId: "" }
          ]
          on_conflict: { constraint: pushbullets_pkey }
        ) {
          affected_rows
        }
      }
    `,
  )
  return data

  // @todo
}

export async function populateWithFreshPushes({
  userId,
  access_token,
  cursor,
  modified_after,
  count = 1,
  emptyCount = 0,
  ttl = 2,
  dryRun,
}: FetchPushesBasicParams) {
  try {
    const params = {
      access_token,
      // - check if there is an ongoing process
      //   - if yes, continue
      //   - if no, start a new process
      cursor: cursor || getPushesCursorByUserId(userId),
      modified_after,
    }

    const { pushes, cursor: nextCursor } = await getPushes(params)

    if (!dryRun) {
      // savePushesToHasura({ pushes, userId, cursor: nextCursor })
      savePushesToPrisma({ pushes, userId, cursor: nextCursor })
    }

    /**
     * sometimes some cursor will return empty results
     * but it there are actually still more results
     * if i make more requests.
     *
     * so for a naive workaround, i will keep trying
     * until i get 10 empty results to determine there is nothing left
     */
    if (ttl > 0 && nextCursor && emptyCount < 10) {
      const isThisCursorResultsEmpty = pushes.length === 0
      return {
        status: 'in-progress',
        args: {
          userId,
          access_token,
          cursor: nextCursor,
          count: ++count,
          modified_after,
          ...(isThisCursorResultsEmpty
            ? {
                emptyCount: ++emptyCount,
              }
            : {
                emptyCount: 0,
              }),
          ttl: --ttl,
          dryRun,
        },
      }
    }

    return {
      status: 'done',
    }
  } catch (error) {
    return {
      status: 'error',
      error,
    }
  } finally {
    console.log('end of populateWithFreshPushes')
  }
}
function savePushesToPrisma(arg0: {
  pushes: unknown[]
  userId: string
  cursor: string | undefined
}) {
  throw new Error('Function not implemented.')
}
