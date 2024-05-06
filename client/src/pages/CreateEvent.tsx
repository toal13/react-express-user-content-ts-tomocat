import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Event, createEvent } from "../api/posts-caller";

export default function CreateEvent() {
  // const mutation = useMutation(createEvent);
  // const { isLoading, isSuccess, error, mutate} = useMutation(createEvent);

  const createEventMutation = useMutation({
    mutationFn: (newEvent: Event) => {
      return createEvent(newEvent);
    },
  });

  // const handleSave = (e) => {
  //   createEventMutation.mutate;
  // }

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const formData: Event = {
      title,
      place,
      date,
      image,
      content,
    } as Event;

    console.log("saved event:", formData);
    createEventMutation.mutate(formData);
  };

  return (
    // <div>
    //    {isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Create event
      </h1>
      <form onSubmit={handleSave} method="POST">
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white dark:text-gray-200">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-white dark:text-gray-200">Address</label>
            <input
              id="place"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200">Time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200">URL</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200">Description</label>
            <textarea
              id="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            onClick={handleSave}
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
    // </div>
  );
}
