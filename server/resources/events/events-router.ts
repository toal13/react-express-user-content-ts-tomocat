import express from 'express';
import { isLoggedIn } from '../users/users-middlewares/isLoggedIn-middleware';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from './events-handler';

export const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', isLoggedIn, createEvent);
eventsRouter.put('/:id', isLoggedIn, updateEvent);
eventsRouter.delete('/:id', isLoggedIn, deleteEvent);

export default eventsRouter;
