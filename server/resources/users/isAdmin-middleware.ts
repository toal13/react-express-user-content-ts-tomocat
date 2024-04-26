import { NextFunction, Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user?.isAdmin) {
    res.status(401).json('Unauthorized access');
    return;
  }
  next();
};
