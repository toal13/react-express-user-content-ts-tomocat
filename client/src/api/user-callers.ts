export interface UserCredentials {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  isAdmin: string;
}

export async function getLoggedInUser() {
  const response = await fetch('/api/users/auth', { credentials: 'include' });
  if (response.status === 401) return null;
  const data = await response.json();
  return data.user;
}

export async function getAllUsers() {
  const response = await fetch('/api/users/');
  return await response.json();
}

export async function loginUser({ username, password }: UserCredentials) {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during login');
    }
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function registerUser({ username, password }: UserCredentials) {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log(JSON.stringify({ username: username, password: password }));

    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      throw new Error(data.message || 'An error occurred during registration');
    }
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

export async function logoutUser() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    console.error('An error occurred during logout');
  }
}

export async function deleteUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`);
  }
}

export async function updateUser(userId: string, userData: Partial<User>) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }
  return response.json();
}
