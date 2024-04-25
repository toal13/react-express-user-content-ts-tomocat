import express from 'express';
import usersRouter, { resourcePath } from '../resources/users/users-router';

export const app = express();

// SKRIV DIN SERVERKOD HÄR!

app.use(express.json());
app.use(resourcePath, usersRouter);
