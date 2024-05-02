import express from 'express';
import { isLoggedIn } from '../users/users-middlewares/isLoggedIn-middleware';
import { CreateEventSchema, validationMiddleware } from './event-validation';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from './events-handler';
import { isEventPresent } from './isEventPresent-middleware';

export const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/:id', isEventPresent, getEvent);
eventsRouter.post('/', isLoggedIn, createEvent);
eventsRouter.put(
  '/:id',
  isLoggedIn,
  validationMiddleware(CreateEventSchema),
  isEventPresent,
  updateEvent
);
eventsRouter.delete('/:id', isLoggedIn, isEventPresent, deleteEvent);

export default eventsRouter;
