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

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
