import { User } from './user-callers';

export interface Event {
  id?: string;
  title: string;
  content: string;
  author?: User;
  date: string;
  place: string;
  category?: string;
  imageId?: string;
  imageUrl?: string;
}

export async function createEvent(event: Event) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  return await response.json();
}
