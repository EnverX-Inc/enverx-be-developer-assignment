import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import ErrorResponse from './utils/errorResponse';
import SuccessResponse from './utils/successResponse';
import { errorHandler } from './middleware/errorHandler.middleware';
import { AppDataSource } from './utils/dataSource.utils';

const App = async () => {
  const app = express();

  // Database Initialization
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.log(err);
  }

  // Request Body Parsing
  app.use(express.json());

  // Allowing Cross Origin Requests from all sources.
  app.use(cors({ origin: '*' }));

  // Development Console Logging
  app.use(morgan('dev'));

  app.get('/', (_: Request, res: Response) => {
    res.send(new SuccessResponse({}, 200, 'Welcome to Home of Blog App'));
  });

  // Router will be added here

  // 404 Route Handler
  app.use((_: Request, __: Response, next: NextFunction) => {
    return next(new ErrorResponse('Route Not Found', 404));
  });

  // Error Handler
  app.use(errorHandler);

  app.listen(process.env.POSRT || 8080, () => {
    console.log(`Server is running in port => ${process.env.PORT || 8080}`);
  });
};

App()
  .then(() => console.log('Application started Succefully'))
  .catch(console.log);
