import cookieSession from 'cookie-session';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { eventsRouter } from '../resources/events/events-router';
import imagesRouter from '../resources/images/images-router';
import usersRouter from '../resources/users/users-router';

export const app = express();

// SKRIV DIN SERVERKOD HÄR!

app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    secret: process.env.SECRET_KEY || 'hjgct564strxc7f8654erd',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
);

app.use('/api/users', usersRouter);
app.use('/api/posts', eventsRouter);
app.use('/api/images', imagesRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});
