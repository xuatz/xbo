import { Worker } from 'bullmq'
import { populateWithFreshPushes } from '../api/bookmarks/fetchPushesBasic'
import { BULL_OPTIONS } from './constants'
import {
  addToQueryPushbulletQueue,
  queryPushbulletQueue,
  QUERY_PUSHBULLET_QUEUE_NAME,
} from './QueryPushbulletQueue'

export const queryPushbulletWorker = new Worker(
  QUERY_PUSHBULLET_QUEUE_NAME,
  async (job) => {
    console.log('xz:hey i got a job!', new Date())
    const { status, args, error } = await populateWithFreshPushes({
      ...job.data,
      // userId: req.user._id,
      // access_token: req.user.providers?.pushbullet?.access_token,
      userId: 'ba5cb9ee-185d-4dbc-9281-440b8084558f',
      access_token: 'o.HlGR8O2piulU28GqWAWYzuRfN6UsB9vv',
      dryRun: true,
    })

    switch (status) {
      case 'in-progress':
        addToQueryPushbulletQueue(args)
        break
      case 'error':
        console.log('xz:error:', error)
        break
      case 'done':
        break
    }
    return status
  },
  {
    ...BULL_OPTIONS,
    limiter: {
      max: 1,
      duration: 5000,
    },
  },
).on('error', (err) => {
  // log the error
  console.error(err)
})
