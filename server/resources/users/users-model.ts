import argon2 from 'argon2';
import mongoose, { InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
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

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await argon2.hash(user.password);
  next();
});

export type User = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model('User', UserSchema);
