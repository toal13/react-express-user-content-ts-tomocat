import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('User', userSchema);
