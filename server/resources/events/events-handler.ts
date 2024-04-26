import { Request, Response } from "express";
import { EventModel } from "./events-model";

export async function getAllEvents(req: Request, res: Response) {
  const events = await EventModel.find({});
  res.status(200).json(events);
}

export async function createEvent(req: Request, res: Response) {
  const events = await EventModel.create(req.body);
  res.status(201).json(events);
}

// export const getAllEvents = (req: Request, res: Response) => {
//   res.status(200).json("Get all events");
// };

export const getEvent = (req: Request, res: Response) => {
  res.status(200).json("Get one Event");
};

// export const createEvent = (req: Request, res: Response) => {
//   res.status(200).json("Create an event");
// };

export const updateEvent = (req: Request, res: Response) => {
  res.status(200).json("Update an event");
};

export const deleteEvent = (req: Request, res: Response) => {
  res.status(200).json("Delete an event");
};
