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

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/auth', isLoggedIn, getUserSelf);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;
