export async function editEvent(eventId: string) {
  const response = await fetch(`/api/posts/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New title",
      place: "New place",
      date: "New date",
      time: "New time",
      content: "New content",
    }),
  });

  if (response.ok) {
    console.log("Event edited successfully");
  } else {
    console.error("Failed to edit event:", response.statusText);
  }
}
