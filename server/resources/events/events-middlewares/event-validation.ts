import e, { Request, Response } from 'express';
import z, { ZodSchema } from 'zod';

export const ValidationEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string().optional(),
  place: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
});

export const CreateEventSchema = ValidationEventSchema.extend({
  author: z.string().optional(),
}).omit({ id: true });

export const UpdateEventSchema = ValidationEventSchema.omit({ id: true });

export type Event = z.infer<typeof ValidationEventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;

export const validationEventMiddleware =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: e.NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      res.status(400).json(result.error.message);
    }
  };
