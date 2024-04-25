import express from "express";
import { eventsRouter } from "../resources/events/events-router";
import usersRouter from "../resources/users/users-router";

export const app = express();

// SKRIV DIN SERVERKOD HÄR!

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
