import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { editEvent } from "../api/edit-caller";

export default function EditPage() {
  const { eventId } = useParams(); // useParams フックを使用して eventId を取得
  console.log("eventId:", eventId);

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${eventId}`); // eventId を含めたURLを生成
      if (!response.ok) {
        throw new Error("Failed to fetch event data");
      }
      return response.json();
    },
  });

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedEventData = {
      title,
      place,
      date,
      time,
      content,
    };

    try {
      await editEvent(eventId, editedEventData);
      console.log("Event edited successfully");
    } catch (error) {
      console.error("Failed to edit event:", error);
    }
  };

  // イベントが存在しない場合
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 m-36">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Edit event
      </h1>
      <form onSubmit={handleEdit} method="PUT">
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
              type="file"
              onChange={() => handleEdit}
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
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
          >
            Edit event
          </button>
        </div>
      </form>
    </section>
  );
}
