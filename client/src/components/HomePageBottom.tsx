import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { getEvents } from '../api/events-callers';
import { Event } from '../api/posts-caller';

export default function HomePageBottom() {
  const { data: events } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return (
    <div className=' flex flex-col'>
      <section className=' flex flex-col sm:flex-row justify-center items-center space-x-20 px-2 m-20 py-12 mx-auto bg-fuchsia-100 w-full'>
        <div className=' text-6xl'>09 September</div>
        <div>
          <h3 className='text-3xl font-semibold'>
            Lorem ipsum dolor sit amet.
          </h3>
          <p className='text-base md:text-lg text-slate-700 my-4 md:my-6 max-w-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A porro
            tenetur aliquam dolore enim? Alias commodi eveniet delectus
            aspernatur dolore atque, temporibus eaque accusantium! Culpa.
          </p>
        </div>
      </section>
      {/* <ShuffleGrid /> */}
      {events && <ShuffleGrid events={events} />}
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
    <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-1  h-[450px] gap-1 mb-6'>
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
