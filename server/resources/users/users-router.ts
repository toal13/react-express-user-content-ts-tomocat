import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserSelf,
  loginUser,
  registerUser,
  updateUser,
} from './users-handler';

import { isAdmin } from './isAdmin-middleware';
import { isLoggedIn } from './isLoggedIn-middleware';
import { CreateSchema, validationMiddleware } from './users-validation';

const usersRouter = express.Router();

usersRouter.get('/', isAdmin, getAllUsers);
usersRouter.get('/auth', isLoggedIn, getUserSelf);
usersRouter.post('/register', validationMiddleware(CreateSchema), registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/:id', isAdmin, updateUser);
usersRouter.delete('/:id', isAdmin, deleteUser);

export default usersRouter;
