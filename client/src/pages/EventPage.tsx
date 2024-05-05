import { useQuery } from '@tanstack/react-query';
import { MdOutlinePlace } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { getEvents } from '../api/events-callers';

interface Event {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  place: string;
  category: string;
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
        <div className='grid grid-cols-3 gap-2 mt-52'>
          {events?.map((event) => (
            <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <a href='#'>
                <img
                  className='rounded-t-lg'
                  src='https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt=''
                />
              </a>
              <div className='p-5'>
                <a href='#'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {event.title}
                  </h5>
                </a>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                  <SlCalender />
                  {event.date}
                  <MdOutlinePlace />
                  {event.place}
                </p>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                  {event.content}
                </p>
                <a
                  href='#'
                  className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Read more
                  <svg
                    className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 5h12m0 0L9 1m4 4L9 9'
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
