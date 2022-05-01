import { QueueEvents } from 'bullmq'
import { BULL_OPTIONS } from './constants'
import { QUERY_PUSHBULLET_QUEUE_NAME } from './QueryPushbulletQueue'
import './QueryPushbulletWorker'

const queueEvents = new QueueEvents(QUERY_PUSHBULLET_QUEUE_NAME, BULL_OPTIONS)

queueEvents.on('completed', ({ jobId: string }) => {
  // Called every time a job is completed in any worker.
  console.log("xz:job's done!")
})

queueEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    // jobId received a progress event
    console.log('xz:hey2')
  },
)
