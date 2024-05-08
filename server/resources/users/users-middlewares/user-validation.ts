import { NextFunction, Request, Response } from 'express';
import z, { ZodSchema } from 'zod';

export const UserUpdateSchema = z.object({
  id: z.string().optional(),
  username: z.string().email(),
  isAdmin: z.boolean().optional(),
});

export const CreateSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof UserUpdateSchema>;
export type CreateUser = z.infer<typeof CreateSchema>;

export const validationMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      // if (process.env.NODE_ENV === "test")
      console.log(result.error.message);
      res.status(400).json(result.error.message);
    }
  };
