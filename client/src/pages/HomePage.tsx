import { useEffect, useState } from 'react';

interface Events {
  _id: string;
  title: 'Outdoor Festival';
  date: '30 April';
  place: 'Kungsbacka';
  category: 'outdoor event';
  createBy: 'user123';
}

export default function HomePage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const response = await fetch('/api/events');
      const events = await response.json();
      setEvents(events);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Our Events</h1>

      <ul>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          events.map((event) => (
            <li key={event._id}>
              {event.title} {event.date} {event.place} {event.category}{' '}
              {event.createBy}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
