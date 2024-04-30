import cookieSession from 'cookie-session';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { eventsRouter } from '../resources/events/events-router';
import usersRouter from '../resources/users/users-router';

export const app = express();

// SKRIV DIN SERVERKOD HÄR!

app.use(express.json());

app.use(
  cookieSession({
    name: 'login',
    secret: process.env.SECRET_KEY,
    maxAge: 1000 * 10,
    httpOnly: true,
  })
);

app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});
