import mongoose, { InferSchemaType, SchemaTypes } from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    date: { type: String, required: false },
    place: { type: String, required: false },
    category: { type: String, required: false },
    imageId: {
      type: SchemaTypes.ObjectId,
      ref: 'images.files',
      required: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

EventSchema.virtual('imageUrl').get(function () {
  // return '/api/images/' + this.imageId;
  return this.imageId ? `/api/images/${this.imageId}` : null;
});

export type Event = InferSchemaType<typeof EventSchema>;
export const EventModel = mongoose.model('Post', EventSchema);
