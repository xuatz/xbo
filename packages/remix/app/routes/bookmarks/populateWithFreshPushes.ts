import { getPushes, GET_PUSHES_PARAMS } from './getPushes'

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getPushesCursorByUserId(userId: string) {
  if (!userId) {
    return undefined
  }

  // @todo
  return undefined
}

function savePushesToHasura(arg0: {
  pushes: unknown[]
  userId: string
  cursor: string | undefined
}) {
  throw new Error('Function not implemented.')
}

type FetchPushesBasicParams = GET_PUSHES_PARAMS & {
  userId: string
  pushes?: unknown[]
  count?: number // @todo rename to runCount
  emptyCount?: number
  ttl?: number
  dryRun?: boolean
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
}: FetchPushesBasicParams): Promise<boolean> {
  try {
    const params = {
      access_token,
      // - check if there is an ongoing process
      //   - if yes, continue
      //   - if no, start a new process
      cursor: cursor || getPushesCursorByUserId(userId),
      modified_after,
    }

    console.log('params', params)

    const { pushes, cursor: nextCursor } = await getPushes(params)

    console.log('pushes', pushes)

    console.log('nextCursor', nextCursor)

    if (!dryRun) {
      savePushesToHasura({ pushes, userId, cursor: nextCursor })
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
      await timeout(2500)

      const isThisCursorResultsEmpty = pushes.length === 0
      return populateWithFreshPushes({
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
      })
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    console.log('end of populateWithFreshPushes')
  }
}
