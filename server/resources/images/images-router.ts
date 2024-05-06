import express from 'express';
import { isLoggedIn } from '../users/users-middlewares/isLoggedIn-middleware';
import { getImage, uploadImage } from './images-handler';

export const imagesRouter = express.Router();

imagesRouter.get('/:id', getImage);
imagesRouter.post('/', isLoggedIn, uploadImage);

// imagesRouter.delete('/:id', isLoggedIn,);

export default imagesRouter;
