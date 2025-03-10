const express = require('express');
const app = express();
const cors = require("cors");
const routes = require('./src/routes');
// const { errorHandler } = require('./middlewares/error.middleware');

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount API routes under /api
app.use('/api', routes);

// Global error handler
// app.use(errorHandler);

module.exports = app;

