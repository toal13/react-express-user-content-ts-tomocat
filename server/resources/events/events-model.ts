import mongoose, { InferSchemaType, SchemaTypes } from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  place: { type: String, required: true },
  category: { type: String, required: true },
  createBy: { type: SchemaTypes.ObjectId, required: true },
});

export type Event = InferSchemaType<typeof EventSchema>;
export const EventModel = mongoose.model("Event", EventSchema);
