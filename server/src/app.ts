import cookieSession from 'cookie-session';
import 'dotenv/config';
import express from 'express';
import { eventsRouter } from '../resources/events/events-router';
import usersRouter from '../resources/users/users-router';

export const app = express();

export interface User {
  username: string;
  password: string;
}

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
