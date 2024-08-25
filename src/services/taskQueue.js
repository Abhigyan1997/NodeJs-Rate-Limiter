const Redis = require('ioredis');
const taskModel = require('../models/taskModel');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const taskQueue = {
  async processTaskQueue() {
    while (true) {
      const task = await redis.lpop('taskQueue');
      if (task) {
        const { user_id } = JSON.parse(task);
        await taskModel.logTaskCompletion(user_id);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  },

  async addTaskToQueue(user_id) {
    const task = JSON.stringify({ user_id, timestamp: Date.now() });
    await redis.rpush('taskQueue', task);
  }
};

// Start processing the queue in the background
taskQueue.processTaskQueue();

module.exports = taskQueue;
