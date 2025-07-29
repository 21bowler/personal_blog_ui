import { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Link, Form } from 'react-router';
import GoogleIcon from './GoogleIcon';
import { signInWithGoogle } from '../services/auth-service';

interface FormProps {
  subtitleText: string;
  togglePromptText: string;
  buttonText: string;
  toggleLink: string;
  isSubmitting: boolean;
  actionData: any;
}

const AuthForm = ({
  subtitleText,
  togglePromptText,
  buttonText,
  toggleLink,
  actionData,
}: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="container">
      <div className="flex h-full min-h-[calc(100vh-200px)] flex-col justify-center w-full mx-auto sm:w-[400px]">
        <div className="mb-10">
          <h1 className="mt-8 mb-2 text-2xl lg:text-3xl font-semibold">
            Get started
          </h1>
          <h2 className="text-xs text-gray-500 font-medium">{subtitleText}</h2>
        </div>
        <div>
          {/* Other providers can be added here*/}
          {/* or ruler appears here */}
          <Form method="post">
            <div className="flex flex-col gap-4">
              <div className="">
                {actionData?.error && (
                  <p className="bg-red-200/50 text-sm text-red-400 border flex gap-2 items-center border-red-100 rounded-md my-2 p-2">
                    <ExclamationTriangleIcon className="size-4" />
                    {actionData.error}
                  </p>
                )}
              </div>
              {/* Continue with google */}
              <div>
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="px-4 py-2 border border-gray-400 flex justify-center items-center gap-2 cursor-pointer font-medium hover:bg-gray-300 duration-300 ease-in transition-colors text-gray-900 text-sm rounded-md w-full"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>

              {/*or div wrapper*/}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-t w-full border-gray-400"></div>
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-sm bg-background">or</span>
                </div>
              </div>
              {/*  Email div wrapper */}
              <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                <div className="flex flex-row justify-between space-x-2 col-span-12">
                  <label htmlFor="email" className="block text-sm break-all">
                    Email
                  </label>
                </div>
                <div className="col-span-12">
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="box-border rounded-md shadow-sm outline-none focus:ring-current focus:ring-2 border text-sm px-4 py-2 w-full"
                  />
                </div>
              </div>

              {/*  Password div wrapper */}
              <div className="text-sm grid gap-2 md:grid md:grid-cols-12">
                <div className="flex flex-row justify-between space-x-2 col-span-12">
                  <label htmlFor="password" className="block text-sm break-all">
                    Password
                  </label>
                </div>
                <div className="col-span-12">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="•••••••"
                      className="box-border rounded-md shadow-sm outline-none focus:ring-current focus:ring-2 border text-sm px-4 py-2 w-full"
                    />
                    <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="relative justify-center cursor-pointer border border-gray-400 inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 text-xs px-2.5 py-1 h-[26px] "
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="outline-none font-regular text-white border border-burnham-700/75 text-base bg-burnham-600 px-4 py-2 cursor-pointer rounded-md transition-all outline-0 hover:bg-burnham-700"
              >
                {buttonText}
              </button>
            </div>
          </Form>
        </div>

        <div className="my-8 text-center text-sm">
          <span className="">{togglePromptText} </span>
          <Link to={toggleLink} className="underline font-semibold">
            {buttonText === 'Sign Up' ? 'Sign In' : 'Sign Up'} Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
