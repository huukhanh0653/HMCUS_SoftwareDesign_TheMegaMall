const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoute');

app.use('/api/v1/user', userRoutes);

module.exports = app;