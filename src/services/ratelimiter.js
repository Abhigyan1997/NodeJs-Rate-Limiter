const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 20, // 20 requests
  duration: 60, // per 60 seconds by IP
  blockDuration: 1, // block for 1 second
  inmemoryBlockOnConsumed: 1, // block for 1 second on 1 task per second
  inmemoryBlockDuration: 1,
});

module.exports = rateLimiter;
