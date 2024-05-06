export interface Event{
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  date: { type: String, required: false },
  place: { type: String, required: false },
  category: { type: String, required: false },
  image: { type: String, required: false },
}

export async function createEvent(event) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  return await response.json();
}
