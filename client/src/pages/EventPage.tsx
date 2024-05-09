
import { useQuery } from '@tanstack/react-query';
import { CiHeart } from 'react-icons/ci';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlinePlace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deleteEvent } from '../api/delete-callers';
import { getEvents } from '../api/events-callers';
import { Event } from '../api/posts-caller';
import { getLoggedInUser } from '../api/user-callers';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";



export default function EventPage() {
  const navigate = useNavigate();
  const { isLoading, data: events } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const user = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  const handleOpenMap = (place: string | number | boolean) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place
    )}`;
    window.open(mapUrl, "_blank");
  };

  const handleEdit = (eventId) => {

    navigate(`/edit/${eventId}`);

  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await deleteEvent(eventId);
        console.log("Event deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  return (
    <div>
      {/* <h2>Events</h2> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-52">
          {events?.map((event) => (
            <div
              key={event.id}
              className=" max-w-80 md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src={event.imageUrl}
                  alt="event"
                />
              </a>
              <div className="flex m-3">
                <div className="flex flex-col items-center mt-6">
                  <span className="text-3xl font-bold mb-2 text-pink-400">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                  </a>
                  <div className="mb-1 text-sm text-primary-500">
                    <div className="flex items-center mb-1 mt-2">
                      <div
                        className="flex items-center text-gray-500 cursor-pointer hover:underline"
                        onClick={() => handleOpenMap(event.place)}
                      >
                        <MdOutlinePlace className="mr-1 size-7" />
                        <span>{event.place}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {event.content.slice(0, 40)}
                    {event.content.length > 40 && "..."}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                    <div>
                      {user.data?._id === event.author ||
                        (user.data?.isAdmin && (
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(event.id)}>
                              <PencilIcon className="size-5" />
                            </button>
                            <button onClick={() => handleDelete(event.id)}>
                              <TrashIcon className="size-5" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
