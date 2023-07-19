import { Request, Response, NextFunction } from 'express';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { x_api_key } = req.headers;

  if (!x_api_key) return res.status(401).end();
  next();
};

export default apiKeyMiddleware;
