import { NextFunction, Request, Response } from 'express';
import { UserModel } from './users-model';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.session, ' from admin middleware');
  const user = await UserModel.findOne({ email: req.session?.user.email });

  if (!user?.isAdmin) {
    res.status(401).json('You are not authorized');
    return;
  }

  next();
};
