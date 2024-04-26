
import express from "express";
import { eventsRouter } from "../resources/events/events-router";
import usersRouter from "../resources/users/users-router";
import cookieSession from 'cookie-session';
import 'dotenv/config';


export const app = express();

export interface User {
  email: string;
  password: string;
}

export const users: User[] = [
  {
    email: 'cata@mail.com',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$hOw19g2mOPTQD53Zd/XIYQ$nbX5Tei0gYK3iXwB3M3iJs5zCccB2XWLixvXPHW/cIg',
  },
];

// SKRIV DIN SERVERKOD HÄR!

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

app.use(
  cookieSession({
    name: 'login',
    secret: process.env.SECRET_KEY,
    maxAge: 1000 * 10,
    httpOnly: true,
  })
);

app.use('/api/users', usersRouter);

