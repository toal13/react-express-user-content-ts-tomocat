import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "./events-handler";

export const eventsRouter = express.Router();

eventsRouter.get("/", getAllEvents);
eventsRouter.get("/:id", getEvent);
eventsRouter.post("/", createEvent);
eventsRouter.put("/:id", updateEvent);
eventsRouter.delete("/:id", deleteEvent);

export default eventsRouter;
