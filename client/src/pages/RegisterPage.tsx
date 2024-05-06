import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user-callers';
import { ValidationSchema } from '../data/validationUser';

export default function LoginPage() {
  const [values, setValues] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return registerUser({
        username: values.username,
        password: values.password,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = ValidationSchema.safeParse(values);
    if (result.success) {
      try {
        const user = await registerUserMutation.mutateAsync(e);
        console.log('Sign up successful:', user);
        navigate('/login');
      } catch (error: unknown) {
        console.error('Sign up failed:', error);
      }
    } else {
      const newErrors: { [key: string]: string } = {};
      for (const error of result.error.errors) {
        newErrors[error.path[0]] = error.message;
      }
      console.log(newErrors);
    }
  };

  return (
    <div className='isolate bg-transparent px-6 py-2 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Welcome
        </h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>
          Please sign up to continue.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
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
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
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
                name='password'
                id='password'
                type='password'
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                autoComplete='current-password'
                className='block w-full rounded-md border-0 p-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none'
              />
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Create Account
          </button>
          <div className=' text-gray-600 mt-5'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-indigo-500 font-semibold hover:underline ml-4'
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
