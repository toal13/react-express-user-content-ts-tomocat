import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { squareData } from '../data/data';
import { Square } from '../pages/HomePage';

export default function HomePageBottom() {
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
      <ShuffleGrid />
    </div>
  );
}

const shuffle = (array: Square[]) => {
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

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className='w-full h-full'
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current!);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className='grid grid-cols-2 grid-rows-1 h-[450px] gap-1 mb-6'>
      {squares.map((sq) => sq)}
    </div>
  );
};
