const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// Use task routes
app.use('/api/v1', taskRoutes);

module.exports = app;
