const rateLimiter = require('../services/ratelimiter');
const taskQueue = require('../services/taskQueue');

const taskController = {
  async handleTaskRequest(req, res) {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).send({ message: 'user_id is required' });
    }

    try {
      // Rate limit based on user_id
      await rateLimiter.consume(user_id);

      // Add task to the queue
      await taskQueue.addTaskToQueue(user_id);

      res.status(200).send({ message: 'Task queued successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(429).send({ message: 'Too many requests. Please try again later.' });
      }
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
};

module.exports = taskController;
