import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../validations/schemas';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const { error } = userSchema.validate(user);
  if (error) return res.status(400).json({ message: 'Some fields are invalid' });

  next();
};

export default validateRegister;
