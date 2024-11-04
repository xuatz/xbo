import { Job, Worker } from 'bullmq';
import { BULLMQ_QUEUES } from '~/constants';
import { processPushbulletTask, QueuedPushbulletTask } from '../pb.server';

const PUSHBULLET_API_COOLDOWN_DURATION = 5000;

const createWorker = (queueName: string) => {
  const worker = new Worker(queueName, async (job: Job) => {
    switch (job.name) {
      case 'default':
        // TODO should remove this `as` sooner than later
        const taskData = job.data as QueuedPushbulletTask;
        return processPushbulletTask(taskData);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  }, {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    concurrency: 1,
    limiter: {
      max: 1,
      duration: PUSHBULLET_API_COOLDOWN_DURATION
    }
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
  });

  return worker;
};

// Cleanup on process exit
process.on('SIGTERM', async () => {
  console.log('Shutting down workers');
  await pushbulletWorker.close();
});

process.on('SIGINT', async () => {
  console.log('Shutting down workers');
  await pushbulletWorker.close();
});

// Export workers
export const pushbulletWorker = createWorker(BULLMQ_QUEUES.PUSHBULLET_API_QUEUE);
