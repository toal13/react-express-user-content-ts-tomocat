import mongoose, { InferSchemaType } from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  place: { type: String, required: true },
  category: { type: String, required: true },
  createBy: { type: String, required: true },
});

export type Event = InferSchemaType<typeof EventSchema>;
export const EventModel = mongoose.model("Event", EventSchema);
