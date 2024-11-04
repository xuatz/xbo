import { pushbulletQueue } from './queue.server';

export class BullMQProducer {
  private queue;

  constructor(queue: typeof pushbulletQueue) {
    this.queue = queue;
  }

  /**
   * Add a job to the queue
   * @param data The job data to be processed
   * @param opts Optional job options (priority, delay, etc.)
   * @returns The created job
   */
  async addJob<T>(data: T, opts: { 
    attempts?: number;
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
  } = {}) {
    try {
      const job = await this.queue.add('default', data, {
        attempts: opts.attempts || 3,
        removeOnComplete: opts.removeOnComplete ?? true,
        removeOnFail: opts.removeOnFail ?? false,
      });
      console.log('Job added to queue with ID:', job.id);
      return job;
    } catch (error) {
      console.error('Error adding job to queue:', error);
      throw error;
    }
  }
}

// Export a default queue instance for pushbullet
export const pushbulletProducer = new BullMQProducer(pushbulletQueue);
