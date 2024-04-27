import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from './users-model';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

export const getUserSelf = async (req: Request, res: Response) => {
  // res.status(200).json(req.session?.user);
  if (!req.session?.user) {
    res.status(401).json(null);
  } else {
    res.status(200).json(req.session?.user);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;

  const hashedPassword = await argon2.hash(password);

  const duplicateUser = await UserModel.findOne({ username });

  if (duplicateUser) {
    res.status(409).json('User already created');
    return;
  }

  const user = await UserModel.create({
    username,
    password: hashedPassword,
    isAdmin,
  });

  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (!user) {
    res.status(401).json('Could not find your user');
    return;
  }

  if (!(await argon2.verify(user.password, password))) {
    res.status(401).json('Incorrect username or password');
    return;
  }

  if (!req.session) {
    res.status(500).json('Session not available');
    return;
  }

  req.session!.user = { username: user.username, isAdmin: user.isAdmin };

  res.status(200).json('You are logged in');
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json('Update a user');
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('Delete user');
};
