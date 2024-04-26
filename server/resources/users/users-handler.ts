import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from './users-model';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

export const getUserSelf = async (req: Request, res: Response) => {
  res.status(200).json(req.session?.user);
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, isAdmin } = req.body;

  const hashedPassword = await argon2.hash(password);

  const duplicateUser = await UserModel.findOne({ email });

  if (duplicateUser) {
    res.status(409).json('User already created');
    return;
  }

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    isAdmin,
  });

  //users.push({ email, password: hashedPassword });
  res.status(200).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // const user = users.find((user) => user.email === email);

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(401).json('Could not find your user');
    return;
  }

  if (!(await argon2.verify(user.password, password))) {
    res.status(401).json('Incorrect email address or password');
    return;
  }

  req.session!.user = { email: user.email, isAdmin: user.isAdmin };

  // req.session!.email = user.email;
  res.status(200).json('You are logged in');
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json('Update a user');
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('Delete user');
};
