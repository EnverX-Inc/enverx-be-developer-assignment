import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Redis from 'ioredis';

const redisClient = new Redis();

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = JSON.stringify(req.body);
    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
      res.locals.validationResult = JSON.parse(cachedResult);
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  }
};

const performValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validationChain = [
    body('blog')
      .notEmpty()
      .withMessage('Blog content is required')
      .isLength({ max: 256 })
      .withMessage('Blog content exceeds maximum length of 256 characters'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['Food', 'Travel', 'Fashion', 'Technology', 'Art','Sports','Other'])
      .withMessage('Invalid category'),
  ];

  try {
    await Promise.all(validationChain.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cacheKey = JSON.stringify(req.body);
    const validationResultCache = JSON.stringify(errors.array());
    await redisClient.set(cacheKey, validationResultCache, 'EX', 120); 

    res.locals.validationResult = errors.array();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const performValidationMiddlewareUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationChain = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
   .notEmpty()
   .withMessage('Password is required')
   .isLength({ min: 8 })
   .withMessage('Password should be at least 8 characters long'),
  ];

  try {
    await Promise.all(validationChain.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cacheKey = JSON.stringify(req.body);
    const validationResultCache = JSON.stringify(errors.array());
    await redisClient.set(cacheKey, validationResultCache, 'EX', 120); 

    res.locals.validationResult = errors.array();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error ll' });
  }
};

export const validatepost = [cacheMiddleware, performValidationMiddleware];

export const validateUserDetails = [cacheMiddleware, performValidationMiddlewareUser];
