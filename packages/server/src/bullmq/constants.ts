export const BULL_OPTIONS = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
  },
}
