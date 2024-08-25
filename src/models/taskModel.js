const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../task_log.txt');

const taskModel = {
  async logTaskCompletion(user_id) {
    const logMessage = `${user_id}-task completed at-${Date.now()}\n`;
    fs.appendFileSync(LOG_FILE, logMessage);
  }
};

module.exports = taskModel;
