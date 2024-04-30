import { useEffect, useState } from 'react';

interface Event {
  _id: string;
  title: string;
  date: string;
  place: string;
  category: string;
  createBy: string;
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/posts');
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
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
    </div>
  );
}
