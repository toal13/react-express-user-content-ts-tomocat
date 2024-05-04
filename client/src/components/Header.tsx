import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, getLoggedInUser, logoutUser } from '../api/user-callers';

export default function Header() {
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getLoggedInUser,
  });

  const handleLogout = async () => {
    console.log('Logging out');
    await logoutUser();
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Events', to: '/events' },
    { name: 'Locations', to: '#' },
    { name: 'Contact', to: '#' },
  ];

  return (
    <header className='absolute inset-x-0 top-0 z-10'>
      <nav
        className='flex items-center justify-between p-4 lg:px-8 '
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link
            to='/'
            className='-m-1.5 p-1.5 flex justify-center items-center'
          >
            <img className='h-16 mt-4 ' src='logo.png' alt='' />
            <h1 className='p-2 text-3xl font-extrabold text-indigo-600 '>
              GoGothenburg
            </h1>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='w-6 h-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden p-4 border border-transparent lg:flex lg:gap-x-12 border-b-black/10'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className='font-semibold leading-6 text-gray-900 transition-all text-md hover:text-indigo-600'
            >
              {item.name}
            </Link>
          ))}
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-4 '>
            {user ? (
              <UserCircleIcon className=' size-8 hover:text-indigo-600' />
            ) : (
              <Link
                to={'/login'}
                className=' font-normal leading-6 text-gray-900 transition-all text-md hover:text-indigo-600 border border-black/10 px-3 py-1 rounded-lg'
              >
                Login
              </Link>
            )}
            <button
              className='font-normal leading-6 text-gray-900 transition-all text-md hover:text-indigo-600'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>GoGothenburg</span>
              <img className='w-auto h-14' src='logo.png' alt='' />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>
          <div className='flow-root mt-6'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='py-6 space-y-2 '>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className='block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50 '
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6'>
                <Link
                  to='/login'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
