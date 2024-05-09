export async function fetchEvent(eventId: string) {
  const response = await fetch(`/api/events/${eventId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching event with ID ${eventId}: ${response.statusText}`
    );
  }

  return response.json();
}

export async function editEvent(eventId: string, eventData: any) {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error(
      `Error editing event with ID ${eventId}: ${response.statusText}`
    );
  }

  return response.json();
}
