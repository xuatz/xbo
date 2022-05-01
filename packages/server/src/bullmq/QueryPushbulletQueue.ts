import { Queue, QueueScheduler } from 'bullmq'
import { FetchPushesBasicParams } from '../api/bookmarks/fetchPushesBasic'
import { BULL_OPTIONS } from './constants'

export const QUERY_PUSHBULLET_QUEUE_NAME = 'query-pushbullet'

export const queueScheduler = new QueueScheduler(
  QUERY_PUSHBULLET_QUEUE_NAME,
  BULL_OPTIONS,
)
export const queryPushbulletQueue = new Queue(
  QUERY_PUSHBULLET_QUEUE_NAME,
  BULL_OPTIONS,
)

export function addToQueryPushbulletQueue(args: FetchPushesBasicParams) {
  queryPushbulletQueue.add('query', args)
}

queryPushbulletQueue.on('waiting', () => {
  console.log('xz:im waiting!')
})
