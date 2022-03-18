import { FormEvent, useState, useEffect } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import Loading from '@common/Loading';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: 'john@mail.com',
    password: 'changeme',
  });
  const { user, auth, getRedirect, clearRedirect, loading, error } = useAuth();
  const router = useRouter();

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.email;
    const password = form.password;
    await auth.signIn(email, password);
  };

  useEffect(() => {
    if (user) {
      const redirectTo = getRedirect();
      clearRedirect();
      router.push(redirectTo);
    }
  }, [user]);

  console.log(error);

  const onLoading = () => loading && <Loading />;

  const onRender = () =>
    !loading && (
      <div className="w-full min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-400">
              Sign in to your account
            </h2>
          </div>
          <Transition
            show={error ? true : false}
            enter="transition-opacity transition-duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="flex w-full justify-center items-center bg-red-100 rounded-md px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-4 mr-1 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-500">{error?.message}</p>
            </div>
          </Transition>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none
                   rounded-none 
                   relative block 
                   w-full 
                   px-3 py-3 
                   border border-gray-300 
                   placeholder-gray-500 text-gray-900 rounded-t-md 
                   focus:outline-none focus:ring-indigo-500 
                   focus:border-indigo-500 focus:z-10 sm:text-sm
                   dark:bg-gray-200`}
                  placeholder="Email address"
                  value={form.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`
                  appearance-none rounded-none relative 
                  block w-full px-3 py-3 border border-gray-300 
                  placeholder-gray-500 text-gray-900 rounded-b-md 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm
                  dark:bg-gray-200
                  `}
                  placeholder="Password"
                  value={form.password}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );

  return (
    <>
      {onLoading()}
      {onRender()}
    </>
  );
}
