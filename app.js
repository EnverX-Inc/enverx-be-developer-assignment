/**
 * Including the configurations file
 */
require('dotenv').config();

/**
 * Including the express configs and header requirments
 */
const express = require('express');
const path = require('path');
const logger = require('morgan');

/**
 * Handling async errors
 */
require('express-async-errors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

/**
 * Including the database settings to the current web application
 */
require('./db');
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const { globalErrorHandler } = require('./controllers');
const { globalMessages } = require('./messages');

/**
 * Including the routes
 */
const routes = require('./routes');

/**
 * starting the main app
 */
const app = express();
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Implement CORS
app.use(cors());
// To remove data, use:
app.use(mongoSanitize());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
// xss prevent attack npm
app.use(xss());
app.use(apiLimiter);
app.use(compression());

// including the routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.all('*', (_req, _res, next) => {
  return next(new ApiError(globalMessages.errors.NOT_FOUND, httpStatus.NOT_FOUND));
});

// global Error Handler
app.use(globalErrorHandler);

module.exports = app;
