import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users-model';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Session:', req.session);

  if (!req.session?.user) {
    return res.status(401).json('You are not logged in!');
  }

  try {
    const user = await UserModel.findOne({
      username: req.session.user.username,
    });

    if (!user?.isAdmin) {
      return res.status(401).json('You are not authorized');
    }

    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res
      .status(500)
      .json({ message: 'Server error during authorization check' });
  }
};
