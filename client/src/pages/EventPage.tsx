import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events-callers';

interface Event {
  _id: string;
  title: string;
  date: string;
  place: string;
  category: string;
  createBy: string;
  image: string;
}

export default function EventPage() {
  const { isLoading, data: events } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return (
    <div>
      <h2>Events</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {events?.map((event) => (
            <li className='p-4 text-black ' key={event._id}>
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
