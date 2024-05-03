export async function getEvents() {
  const response = await fetch('/api/posts');
  return await response.json();
}
