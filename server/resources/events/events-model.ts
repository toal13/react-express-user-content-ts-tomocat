import mongoose, { InferSchemaType, SchemaTypes } from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: SchemaTypes.ObjectId, ref: 'Author', required: true },
  date: { type: String, required: false },
  place: { type: String, required: false },
  category: { type: String, required: false },
});

export type Event = InferSchemaType<typeof EventSchema>;
export const EventModel = mongoose.model('Post', EventSchema);
