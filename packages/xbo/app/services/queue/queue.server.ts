import { Queue } from 'bullmq';
import { BULLMQ_QUEUES } from '~/constants';

const createQueue = (queueName: string) => {
  return new Queue(queueName, {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    }
  });
};

// Cleanup on process exit
process.on('SIGTERM', async () => {
  console.log('Shutting down Redis connection');
  await pushbulletQueue.close();
});

process.on('SIGINT', async () => {
  console.log('Shutting down Redis connection');
  await pushbulletQueue.close();
});

// Export queues
export const pushbulletQueue = createQueue(BULLMQ_QUEUES.PUSHBULLET_API_QUEUE);
