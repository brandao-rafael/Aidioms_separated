import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validations/schemas';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const { error } = loginSchema.validate(user);
  if (error) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

export default validateLogin;
