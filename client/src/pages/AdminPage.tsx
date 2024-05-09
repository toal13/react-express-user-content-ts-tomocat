import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, deleteUser, getAllUsers } from '../api/user-callers';

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { isLoading, data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      console.log('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = async (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  return (
    <div className='overflow-x-auto  rounded-lg w-auto md:w-[1200px] shadow-sm  mt-36 mb-10 '>
      <table className='border-collapse bg-white text-left text-sm text-gray-500 w-full'>
        <thead className='bg-indigo-50'>
          <tr>
            <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
              Name
            </th>
            <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
              Role
            </th>
            <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
              Username
            </th>
            <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y  divide-gray-100 border-t border-gray-100'>
          {isLoading ? (
            <tr>
              <td colSpan={5} className='px-6 py-4 text-center'>
                Loading...
              </td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr key={user._id} className='hover:bg-gray-50'>
                <td className='flex items-center gap-3 px-6 py-4 font-normal text-gray-900'>
                  <div className='relative h-10 w-10'>
                    <img
                      className='h-full w-full rounded-full object-cover object-center'
                      src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800'
                      alt=''
                    />
                    <span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
                  </div>
                  <div className='text-sm'>
                    <div className='font-medium text-gray-700'>Jane Doe</div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                      user.isAdmin ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.isAdmin ? 'bg-green-600' : 'bg-red-400'
                      }`}
                    ></span>
                    {user.isAdmin ? 'Admin' : 'Not Admin'}
                  </span>
                </td>
                <td className='px-6 py-4'>{user.username}</td>
                <td className='px-6 py-4'>
                  <div className='flex justify-start gap-10'>
                    <TrashIcon
                      className=' size-6 hover:cursor-pointer'
                      onClick={() => handleDelete(user._id)}
                    />
                    <PencilIcon
                      className='size-6 hover:cursor-pointer'
                      onClick={() => console.log('Edit user')}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
