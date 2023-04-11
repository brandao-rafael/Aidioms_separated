import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

interface DecodedToken {
  userId: string;
}

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const tokenVerified = jwt.verify(authorization, JWT_SECRET as string) as DecodedToken;
    req.body.userId = tokenVerified.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token must be a valid token' });
  }
};

export default validateJwt;
