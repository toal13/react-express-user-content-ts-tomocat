import mongoose, { InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
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

export type User = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model('User', UserSchema);
