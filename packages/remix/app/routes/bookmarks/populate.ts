import type { ActionFunction } from '@remix-run/node'
import { Queue } from 'bullmq'
import { json } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, 405)
  }

  let payload: { userId: string }
  try {
    payload = await request.json()
  } catch (err) {
    return json({ message: 'No userId provided' }, 400)
  }

  // const queue = new Queue('QueryPushbullet')
  // queue.add('query', { userId: payload?.userId })

  return json(200)
}
