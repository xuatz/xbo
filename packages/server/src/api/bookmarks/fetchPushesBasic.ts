import axios from 'axios'
import { timeout } from '../../utils/timeout'
import { GET_PUSHES_PARAMS, Push, getPushes } from './getPushes'
import { request, gql } from 'graphql-request'

const endpoint = 'http://localhost:8080/v1/graphql'

type FetchPushesBasicParams = GET_PUSHES_PARAMS & {
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
  ttl,
  dryRun,
}: FetchPushesBasicParams): Promise<boolean> {
  try {
    // - check if there is an ongoing process
    //   - if yes, continue
    //   - if no, start a new process
    const queryCursor = cursor || getPushesCursorByUserId(userId)

    const params = {
      access_token,
      cursor: queryCursor,
      modified_after,
    }

    console.log('params', params)

    const { pushes, cursor: nextCursor } = await getPushes({
      access_token,
      cursor: queryCursor,
      modified_after,
    })

    // console.log('pushes', pushes)

    console.log('nextCursor', nextCursor)

    if (!dryRun) {
      savePushesToHasura({ pushes, userId, cursor: nextCursor })
    }

    if (!!ttl && ttl > 0 && nextCursor && emptyCount < 10) {
      await timeout(10000)

      const isThisCursorResultsEmpty = pushes.length === 0
      return populateWithFreshPushes({
        userId,
        access_token,
        cursor: nextCursor,
        count: ++count,
        modified_after,
        ...(isThisCursorResultsEmpty && {
          emptyCount: ++emptyCount,
        }),
        ...(!!isThisCursorResultsEmpty && {
          ttl: --ttl,
        }),
        dryRun,
      })
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// export const fetchPushesBasic = async ({
//   access_token,
//   cursor,
//   modified_after,
//   pushes = [],
//   count = 1,
//   emptyCount = 0,
// }: FetchPushesBasicParams): Promise<Push[]> => {
//   const demoLimit = 2

//   console.log('fetchPushesBasic():count:', count)
//   console.log('cursor:', cursor)
//   console.log('modified_after:', modified_after)

//   const { pushes: newPushes, cursor: nextCursor } = await getPushes({
//     access_token,
//     cursor,
//     modified_after,
//   })
//   console.log('newPushes.length', newPushes.length)

//   const mergedPushes = pushes.concat(newPushes)

//   // if (nextCursor && count < demoLimit) {
//   if (nextCursor && emptyCount < 10) {
//     await timeout(10000)

//     const isThisCursorResultsEmpty = newPushes.length === 0
//     return fetchPushesBasic({
//       access_token,
//       cursor: nextCursor,
//       pushes: mergedPushes,
//       count: ++count,
//       modified_after,
//       ...(isThisCursorResultsEmpty && {
//         emptyCount: emptyCount + 1,
//       }),
//     })
//   } else {
//     return mergedPushes
//   }
// }
