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
} from './users-middlewares/user-validation';

const usersRouter = express.Router();

usersRouter.get('/', isAdmin, getAllUsers);
usersRouter.get('/auth', isLoggedIn, getUserSelf);
usersRouter.post('/register', validationMiddleware(CreateSchema), registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put(
  '/:id',
  isAdmin,
  validationMiddleware(CreateSchema),
  updateUser
);
usersRouter.delete('/:id', isAdmin, deleteUser);

export default usersRouter;
