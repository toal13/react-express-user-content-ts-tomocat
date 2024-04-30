import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from './users-model';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSelf = async (req: Request, res: Response) => {
  if (!req.session?.user) {
    res.status(401).json(null);
  } else {
    res.status(200).json(req.session?.user);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;

  try {
    const duplicateUser = await UserModel.findOne({
      username: username.trim(),
    });

    if (duplicateUser) {
      res.status(409).json('User already created');
      return;
    }

    const user = await UserModel.create({
      username: username.trim(),
      password,
      isAdmin: isAdmin || false,
    });

    await user.save();

    res.status(201).json({ message: 'Account created', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (!user) {
    res.status(401).json('Could not find your user');
    return;
  }

  if (user.username !== username) {
    res.status(401).json('Incorrect username or password');
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

  req.session.user = {
    _id: user?._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  res
    .status(200)
    .json({ message: 'You are now logged in!', user: req.session.user });
};

export const logoutUser = (req: Request, res: Response) => {
  req.session = null;
  res.status(204).json({ message: 'You are now logged out!' });
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json('Update a user');
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json('User not found');
      return;
    }
    res.status(200).json('User deleted');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
