import { useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  place: string;
  category: string;
  createBy: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/events');
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    // const fetchUsers = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('/api/users');
    //     const users = await response.json();
    //     setUsers(users);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchUsers();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <h2>Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li className=' text-black' key={event._id}>
              {event.title}
            </li>
          ))}
        </ul>
      )}
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
