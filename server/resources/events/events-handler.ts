import { Request, Response } from "express";
import { EventModel } from "./events-model";

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await EventModel.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching all events:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching all events." });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const event = await EventModel.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the event." });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.id;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the event." });
  }
}

// export const getEvent = (req: Request, res: Response) => {
//   res.status(200).json("Get one Event");
// };

// export const createEvent = (req: Request, res: Response) => {
//   res.status(200).json("Create an event");
// };

export const updateEvent = (req: Request, res: Response) => {
  res.status(200).json("Update an event");
};

export const deleteEvent = (req: Request, res: Response) => {
  res.status(200).json("Delete an event");
};
