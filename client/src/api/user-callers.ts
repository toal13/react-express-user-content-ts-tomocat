export interface User {
  username: string;
  password: string;
}

export async function getLoggedInUser() {
  const response = await fetch('/api/users/auth');
  if (response.status === 401) return undefined;
  return await response.json();
}

export async function loginUser({ username, password }: User) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  console.log(JSON.stringify({ username, password }));

  const data = await response.json();
  if (response.ok) {
    console.log(data);
  } else {
    console.error(data);
  }
}

export async function registerUser({ username, password }: User) {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  console.log(JSON.stringify({ username, password }));

  const data = await response.json();
  if (response.ok) {
    console.log(data);
  } else {
    console.error(data);
  }
}

export async function logoutUser() {
  const response = await fetch('/api/users/logout', { method: 'POST' });
  if (!response.ok) {
    console.error('Failed to log out');
  }
}
