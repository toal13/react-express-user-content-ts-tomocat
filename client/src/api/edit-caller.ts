import { Event } from './posts-caller';

export async function fetchEvent(eventId: string) {
  const response = await fetch(`/api/posts/${eventId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching event with ID ${eventId}: ${response.statusText}`
    );
  }

  return response.json();
}

export async function editEvent(eventId: string, eventData: Partial<Event>) {
  const response = await fetch(`/api/posts/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error(`Failed to edit event: ${response.statusText}`);
  }

  return response.json();
}
