import { NextFunction, Request, Response } from 'express';
import z, { ZodSchema } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().email(),
  password: z.string(),
});

export const CreateSchema = UserSchema.omit({ id: true });
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateSchema>;

export const validationMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
      return;
    }
  };
