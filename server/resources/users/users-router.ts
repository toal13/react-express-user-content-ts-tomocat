import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserSelf,
  loginUser,
  registerUser,
  updateUser,
} from './users-handler';

import { isLoggedIn } from './isLoggedIn-middleware';
import { CreateSchema, validationMiddleware } from './users-validation';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers); // for the user with the admin role
usersRouter.get('/auth', isLoggedIn, getUserSelf);
usersRouter.post('/register', validationMiddleware(CreateSchema), registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/:id', updateUser); // for the user with the admin role
usersRouter.delete('/:id', deleteUser); // for the user with the admin role

export default usersRouter;
