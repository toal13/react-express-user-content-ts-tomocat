import { Request, Response } from 'express';
import { EventModel } from './events-model';

export async function getAllEvents(req: Request, res: Response) {
  const events = await EventModel.find({});
  res.status(200).json(events);
}

export async function createEvent(req: Request, res: Response) {
  const event = await EventModel.create(req.body);
  res.status(201).json(event);
}

// export const getAllEvents = (req: Request, res: Response) => {
//   res.status(200).json("Get all events");
// };

export const getEvent = (req: Request, res: Response) => {
  res.status(200).json('Get one Event');
};

// export const createEvent = (req: Request, res: Response) => {
//   res.status(200).json("Create an event");
// };

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event updated', event });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
