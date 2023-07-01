import { Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

export const errorHandler = (err: ErrorResponse, _: Request, res: Response) => {
  const error = { ...err };

  error.message = err.message;

  return res.status(error.statusCode || 500).json({
    status: false,
    txt: error.message || 'Internal Error',
    data: error.data || {},
  });
};
