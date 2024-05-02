import express from 'express';
import { isLoggedIn } from '../../users/users-middlewares/isLoggedIn-middleware';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from '../events-handler';
import { isEventPresent } from '../isEventPresent-middleware';
import {
  CreateEventSchema,
  validationEventMiddleware,
} from './event-validation';

export const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/:id', isEventPresent, getEvent);
eventsRouter.post('/', isLoggedIn, createEvent);
eventsRouter.put(
  '/:id',
  isLoggedIn,
  isEventPresent,
  validationEventMiddleware(CreateEventSchema),
  updateEvent
);
eventsRouter.delete('/:id', isLoggedIn, isEventPresent, deleteEvent);

export default eventsRouter;
