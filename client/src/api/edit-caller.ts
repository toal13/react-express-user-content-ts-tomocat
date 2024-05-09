export interface Event {
  title: string;
  content: string;
  author?: string;
  date: string;
  place: string;
  category?: string;
  imageId?: string;
  imageUrl?: string;
}

export async function editEvent(eventId: string, eventData: Partial<Event>) {
  const response = await fetch(`/api/posts/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    console.log("Event edited successfully");
  } else {
    console.error("Failed to edit event:", response.statusText);
  }
}
