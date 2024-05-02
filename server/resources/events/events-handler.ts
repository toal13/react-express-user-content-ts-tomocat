import { Request, Response } from 'express';
import { EventModel } from './events-model';

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await EventModel.find({}).populate('author', 'username');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json('An error occurred while fetching all events.');
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const event = await EventModel.create({
      ...req.body,
      author: req.session!.user._id,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json('An error occurred while creating the event.');
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.id;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json('Event not found');
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json('An error occurred while fetching the event.');
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventToUpdate = await EventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!eventToUpdate) {
      res.status(404).json('Event not found');
      return;
    }

    if (
      eventToUpdate.author.toString() !== req.session!.user._id.toString() &&
      !req.session!.user.isAdmin
    ) {
      res.status(403).json('You are not allowed to update this event');
      return;
    }

    res.status(200).json(eventToUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json('Event not found');
      return;
    }

    res.status(204).json('Event deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
