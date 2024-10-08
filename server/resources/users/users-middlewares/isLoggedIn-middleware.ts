import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session?.user?.username) {
    res.status(401).json('You are not logged in');
    return;
  }
  next();
};
