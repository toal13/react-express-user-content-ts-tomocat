import { Menu, Transition } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, getLoggedInUser, logoutUser } from '../api/user-callers';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DropdownMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getLoggedInUser,
  });

  console.log(user);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null); // Client-side-only
      // queryClient.invalidateQueries({ queryKey: ['user'] }); // Server-Call
      console.log('Logout successful');
      navigate('/login');
    },
  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className=''>
          <div className='relative h-10 w-10'>
            <img
              className='h-full w-full rounded-full object-cover object-center'
              src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800'
              alt=''
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='create'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Create Event
                </Link>
              )}
            </Menu.Item>
            {user && user?.isAdmin && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/admin'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
