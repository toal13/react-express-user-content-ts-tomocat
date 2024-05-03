import { NextFunction, Request, Response } from 'express';
import { EventModel } from '../events-model';

export const isEventPresent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event = await EventModel.findOne({ _id: req.params.id });

  if (!event) {
    return res.status(404).json(`The event with id ${req.params.id} not found`);
  }

  next();
};
