import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api/events-callers';
import { Event } from '../api/posts-caller';
import { User, getLoggedInUser } from '../api/user-callers';
import HomePageBottom from '../components/HomePageBottom';

export default function HomePage() {
  const { isLoading, data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getLoggedInUser,
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  console.log('Fetched Events:', events);
  return (
    <div className=' flex flex-col'>
      <section className='w-full px-8 mt-28 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto'>
        <div>
          <h3 className='text-3xl md:text-5xl  font-semibold'>
            Uncover the Pulse of Gothenburg
          </h3>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6 max-w-lg'>
            Explore the best events across the city, from live concerts to local
            festivals.
          </p>
          <div className='flex gap-2'>
            <Link
              to={'/events'}
              className='bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-500 active:scale-95'
            >
              Explore Events
            </Link>
            <Link
              to={user ? '/create' : '/login'}
              className='  bg-fuchsia-100 text-black font-medium py-2 px-4 rounded transition-all hover:bg-indigo-100/50 active:scale-95'
            >
              Create an Event <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </div>
        {events && <ShuffleGrid events={events} />}
      </section>
      <HomePageBottom />
    </div>
  );
}

export interface ShuffleGridProps {
  events: Event[];
}

const ShuffleGrid = ({ events }: ShuffleGridProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares(events));

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current!);
  }, [events]);

  const shuffleSquares = () => {
    setSquares(generateSquares(events));

    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className='grid grid-cols-4 grid-rows-4 h-[450px] gap-1'>
      {squares}
    </div>
  );
};

const shuffle = (array: Event[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = (events: Event[]) => {
  return shuffle(events).map((events) => (
    <motion.div
      key={`${events.id}`}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className='w-full h-full'
      style={{
        backgroundImage: `url(${events.imageUrl})`,
        backgroundSize: 'cover',
      }}
    ></motion.div>
  ));
};
