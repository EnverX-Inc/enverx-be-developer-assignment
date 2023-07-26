const httpStatus = require('http-status');
const AppError = require('../utils/ApiError');

/* eslint-disable */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

const sendErrorDev = (err, req, res) => {
  if (!err.statusCode) {
    return res.status(err.code).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) SEND ERROR
  return res.status(err.statusCode).json({
    status: err.status,
    code: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        code: err.statusCode,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 2) Send generic message
    if (!err.statusCode) {
      return res.status(err.code).json({
        status: err.status,
        code: err.statusCode,
        message: err.message,
      });
    }
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
    });
  }

  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 2) Send generic message
  return res.status(err.statusCode).json({
    status: err.status,
    code: err.statusCode,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.code = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    return sendErrorProd(error, req, res);
  }
};
/* eslint-enable */
