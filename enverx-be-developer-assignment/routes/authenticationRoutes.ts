import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/authenticate.service';
import { validateUserDetails } from '../middlewares/validator';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', validateUserDetails, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    next(error); 
  }
});

authenticationRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default authenticationRouter;
