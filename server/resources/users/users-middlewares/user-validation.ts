import { NextFunction, Request, Response } from 'express';
import z, { ZodSchema } from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  username: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().optional(),
});

export const CreateSchema = UserSchema.omit({ id: true });
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateSchema>;

export const validationMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      res.status(400).json(result.error.message);
    }
  };
