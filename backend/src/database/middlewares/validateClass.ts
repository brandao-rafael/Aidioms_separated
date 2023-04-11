import { Request, Response, NextFunction } from 'express';
import { classSchema } from '../validations/schemas';

const validateClass = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  const { error } = classSchema.validate(payload);
  if (error) return res.status(400).json({ message: 'All fields must be filled' });
  next();
};

export default validateClass;
