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

export async function deleteEvent(eventId: string) {
  const response = await fetch(`/api/posts/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (response.ok) {
    console.log("Event deleted successfully");
  } else {
    console.error("Failed to delete event:", response.statusText);
  }
}

