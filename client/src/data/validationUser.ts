import { z } from 'zod';

export const ValidationSchema = z.object({
  username: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export interface LoginValues {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}
