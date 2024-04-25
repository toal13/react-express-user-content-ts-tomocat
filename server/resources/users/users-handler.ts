import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json('Get all users');
};

export const getUser = (req: Request, res: Response) => {
  res.status(200).json('Get one user');
};

export const registerUser = (req: Request, res: Response) => {
  res.status(200).json('Register a user');
};

export const loginUser = (req: Request, res: Response) => {
  res.status(200).json('Login user');
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json('Update a user');
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('Delete user');
};
