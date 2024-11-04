import { authenticator } from './auth.server';
import { pb } from './db.server';
import { pushbulletProducer } from './queue/producer.server';
import { pushbulletQueue } from './queue/queue.server';

export interface IPushesParams {
  active?: string;
  limit?: number;
  cursor?: string;
  modified_after?: string;
}

interface Push {
  type: string;
  title?: string;
  body?: string;
  url?: string;
  created: number;
  modified: number;
  dismissed: boolean;
  direction: 'self' | 'incoming' | 'outgoing';
  sender_name?: string;
  receiver_name?: string;
  iden: string;
}

interface PushbulletResponse {
  pushes: Push[];
  cursor?: string;
}

// Only store non-sensitive task parameters in Redis
export interface QueuedPushbulletTask {
  userId: string; // to look up the user's session
  params: IPushesParams;
}

// Process Pushbullet tasks
export async function processPushbulletTask(
  task: QueuedPushbulletTask
): Promise<PushbulletResponse> {
  try {
    console.log('Processing Pushbullet task for user:', task.userId);

    // Get user from PocketBase
    const user = await pb.collection('users').getOne(task.userId);
    if (!user?.providers?.pushbullet?.tokens?.access_token) {
      throw new Error('User not found or missing Pushbullet access token');
    }

    const accessToken = user.providers.pushbullet.tokens.access_token;
    const queryParams = new URLSearchParams({
      limit: `${task.params?.limit ?? 10}`,
      active: task.params?.active ?? 'true',
      ...(task.params?.modified_after && {
        modified_after: task.params.modified_after,
      }),
      ...(task.params?.cursor && { cursor: task.params.cursor }),
    });

    const response = await fetch(
      `https://api.pushbullet.com/v2/pushes?${queryParams}`,
      {
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log('xz:data', data);
    console.log('Successfully fetched Pushbullet data');
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch pushes: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
    return { pushes: [] };
  }
}

export async function pullFromPushbullet(
  request: Request,
  params?: IPushesParams
): Promise<boolean> {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    throw new Error('User not authenticated');
  }

  const taskData: QueuedPushbulletTask = {
    userId: user.id,
    params: params || {},
  };

  // Add task to Redis queue
  await pushbulletProducer.addJob(taskData);

  return true;
}
