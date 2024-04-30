import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserSelf,
  loginUser,
  registerUser,
  updateUser,
} from './users-handler';

import { isAdmin } from './users-middlewares/isAdmin-middleware';
import { isLoggedIn } from './users-middlewares/isLoggedIn-middleware';
import {
  CreateSchema,
  validationMiddleware,
} from './users-middlewares/registerUser-validation';

const usersRouter = express.Router();

usersRouter.get('/', isAdmin, getAllUsers); // for the user with the admin role
usersRouter.get('/auth', isLoggedIn, getUserSelf);
usersRouter.post('/register', validationMiddleware(CreateSchema), registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/:id', isAdmin, updateUser); // for the user with the admin role
usersRouter.delete('/:id', isAdmin, deleteUser); // for the user with the admin role

export default usersRouter;
