export async function getLoggedInUser() {
  const response = await fetch('/api/users/auth');
  if (response.status === 401) return undefined;
  return await response.json();
}
