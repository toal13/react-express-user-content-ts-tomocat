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
    return res.status(401).json('You are not logged in');
  }

  try {
    const user = await UserModel.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json('User not found');
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    res.status(200).json({ message: 'You are logged in.', user: userResponse });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;

  try {
    const duplicateUser = await UserModel.findOne({
      username: username.trim(),
    });
    if (duplicateUser) {
      return res.status(409).json('User already exists');
    }

    const user = await UserModel.create({
      username: username.trim(),
      password,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    console.log('User:', user);
    if (!user) {
      return res.status(401).json('Incorrect username or password');
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid || !req.session) {
      return res.status(401).json('Incorrect username or password');
    }

    if (req.session) {
      req.session.user = {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      };
    }

    res.status(200).json(req.session?.user);
  } catch (error) {
    console.error('Login Error: ', error);
    res.status(500).json('An error occurred during login');
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.session = null;
  res.status(204).json({ message: 'You are now logged out!' });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, isAdmin } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (password) {
      user.password = await argon2.hash(password);
    }
    if (isAdmin !== undefined) user.isAdmin = isAdmin;

    await user.save();
    res.status(200).json({
      message: 'User updated',
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error('Update Error:', error);
    res
      .status(500)
      .json({ message: 'An error occurred during the update process' });
  }
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
