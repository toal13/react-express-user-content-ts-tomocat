import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from './users-handler';

const usersRouter = express.Router();

export const resourcePath = '/api/users';

usersRouter.get('/', getAllUsers);
usersRouter.get(`/:id`, getUser);
usersRouter.post(`/register`, registerUser);
usersRouter.post(`/login`, loginUser);
usersRouter.put(`/:id`, updateUser);
usersRouter.delete(`:id`, deleteUser);

export default usersRouter;
