const express = require('express');
const taskController = require('../controller/taskController');

const router = express.Router();

router.post('/task', taskController.handleTaskRequest);

module.exports = router;
