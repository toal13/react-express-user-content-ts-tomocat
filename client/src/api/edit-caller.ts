import { Event } from './posts-caller';

export async function editEvent(eventId: string, eventData: Event) {
  const response = await fetch(`/api/posts/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    console.log('Event edited successfully');
  } else {
    console.error('Failed to edit event:', response.statusText);
  }
}
