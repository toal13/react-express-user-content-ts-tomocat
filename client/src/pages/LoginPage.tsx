import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful', data);
    } else {
      console.error('Login failed', data);
    }
  };

  return (
    <div className='isolate bg-transparent px-6 py-2 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Welcome back
        </h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>
          Please sign in to continue.
        </p>
      </div>
      <form
        action='/api/users/login'
        method='POST'
        className='mx-auto mt-14 max-w-xl sm:w-96'
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold leading-6 text-gray-900'
            >
              Email
            </label>
            <div className='mt-2.5'>
              <input
                type='email'
                name='username'
                id='email'
                autoComplete='email'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none '
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label className='block text-sm font-semibold leading-6 text-gray-900 '>
              Password
            </label>
            <div className='relative mt-2.5'>
              <input
                type='tel'
                name='password'
                id='password'
                autoComplete='current-password'
                className='block w-full rounded-md border-0 p-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none'
              />
            </div>
          </div>

          <div className='flex gap-x-4 sm:col-span-2'>
            <div className='flex h-6 items-center'>Remember me</div>
            <div className='text-sm leading-6 text-gray-600'>
              <a href='#' className='font-semibold text-indigo-600'>
                Forgot your password?
              </a>
              .
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            onSubmit={handleSubmit}
            className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign in
          </button>
          <div className=' text-gray-600 mt-5'>
            New to Evento?{' '}
            <button
              type='submit'
              className=' text-indigo-500 font-semibold hover:underline ml-4'
            >
              Sign up now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
