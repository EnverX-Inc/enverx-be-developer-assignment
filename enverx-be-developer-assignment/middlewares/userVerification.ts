import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Redis from "ioredis";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const getJwtKey = (): Secret => {
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    throw new Error("JWT key is not configured!");
  }
  return jwtKey;
};

const redisClient = new Redis(); 

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const token = authHeader.split(" ")[1];
    const jwtKey = getJwtKey();

  
    const cachedUser = await redisClient.get(token);
    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }
    console.log("ss",token, jwtKey)


    jwt.verify(token, jwtKey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid!" });
      }

      const user = decoded as UserPayload;
      req.user = user;

      await redisClient.set(token, JSON.stringify(user), "EX", 3600); 

      next();
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
