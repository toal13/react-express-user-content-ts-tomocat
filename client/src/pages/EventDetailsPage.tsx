import { useQuery } from '@tanstack/react-query';
import { MdOutlinePlace } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../api/edit-caller';
import { Event } from '../api/posts-caller';

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ['event', eventId],
    queryFn: () => {
      if (!eventId) {
        throw new Error('Invalid event ID');
      }
      return fetchEvent(eventId);
    },
  });

  console.log('Event Detail:', event);

  const handleOpenMap = (place: string | number | boolean | undefined) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place
    )}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <section className='w-full mx-auto mt-28 py-10 bg-fuchsia-50 dark:bg-gray-900 dark:text-white'>
      <div className=' flex flex-col sm:flex-row justify-center p-8 mt-4 gap-16'>
        <div className=' xs:w-full'>
          <img
            className='lg:rounded-t-lg w-full sm:rounded-sm xs:rounded-sm sm:h-[450px]'
            src={event?.imageUrl}
            alt='billboard image'
          />
        </div>
        <div className=' flex flex-col gap-4 lg:w-[50%] sm:w-full xs:w-full  dark:bg-gray-900 dark:text-gray-400 p-4 xs:p-0 rounded-md'>
          <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
            {event?.title}
          </h2>
          <div
            className='flex items-center text-gray-500 cursor-pointer hover:underline my-4'
            onClick={() => handleOpenMap(event?.place)}
          >
            <MdOutlinePlace className='mr-1 size-7' />
            <span>{event?.place}</span>
          </div>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            {event?.date}
          </h2>
          <p className='text-md mt-4'>{event?.content}</p>
        </div>
      </div>
    </section>
  );
}
