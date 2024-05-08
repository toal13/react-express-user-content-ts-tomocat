import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Event, createEvent } from '../api/posts-caller';

const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('images', imageFile);

  const response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.log('Cannot upload image.');
  }

  return await response.json();
};

export default function CreateEvent() {
  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {},
  });

  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    let imageId = '';
    if (image) {
      try {
        imageId = await uploadImage(image);
      } catch (error) {
        console.error('Image upload error:', error);
        return;
      }
    }

    const event: Event = {
      title,
      place,
      date,
      content,
      imageId,
    };

    console.log('saved event:', event);
    createEventMutation.mutate(event);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    // <div>
    //    {isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
    <section className='max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 m-36'>
      <h1 className='text-xl font-bold text-white capitalize dark:text-white'>
        Create event
      </h1>
      <form onSubmit={handleSave} method='POST'>
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
          <div>
            <label className='text-white dark:text-gray-200'>Title</label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-white dark:text-gray-200'>Address</label>
            <input
              id='place'
              type='text'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            />
          </div>
          <div>
            <label className='text-white dark:text-gray-200'>Date</label>
            <input
              id='date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            />
          </div>
          <div>
            <label className='text-white dark:text-gray-200'>Time</label>
            <input
              id='time'
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            />
          </div>
          <div>
            <label className='text-white dark:text-gray-200'>URL</label>
            <input
              id='image'
              type='file'
              onChange={handleFileChange}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            />
          </div>
          <div>
            <label className='text-white dark:text-gray-200'>Description</label>
            <textarea
              id='content'
              type='text'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            ></textarea>
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600'
          >
            Save
          </button>
        </div>
      </form>
    </section>
    // </div>
  );
}
