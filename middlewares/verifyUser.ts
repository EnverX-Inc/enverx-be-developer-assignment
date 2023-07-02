import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface UserPayload {
  id: string,
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, String(process.env.JWT_KEY)) as UserPayload
      if (!user) return res.status(403).json({ message: "Token is invalid!" });
      req.user = user;
      next()
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  } catch (error) {
    console.error(error)
    throw new Error
  }

};

