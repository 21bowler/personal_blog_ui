import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';

interface FormProps {
  formType: string;
  subtitleText: string;
  togglePromptText: string;
  buttonText: string;
  toggleLink: string;
}

const AuthForm = ({
  formType,
  subtitleText,
  togglePromptText,
  buttonText,
  toggleLink,
}: FormProps) => {
  return (
    <section className="container h-full flex flex-col justify-center w-[400px]">
      <div className="mb-10">
        <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">Get Started</h1>
        <h2 className="text-sm text-gray-500">{subtitleText}</h2>
      </div>
      <div>
        {/* Other providers can be added here*/}
        {/* or ruler appears here */}
        <form>
          <div className="flex flex-col gap-4">
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
                    type="password"
                    id="password"
                    placeholder="•••••••"
                    className="box-border rounded-md shadow-sm outline-none focus:ring-current focus:ring-2 border text-sm px-4 py-2 w-full"
                  />
                  <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                    <button
                      type="button"
                      className="relative justify-center cursor-pointer border border-gray-400 inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 text-xs px-2.5 py-1 h-[26px] "
                    >
                      <EyeIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="outline-none font-regular text-white border border-aquamarine-700/75 text-base bg-aquamarine-600 px-4 py-2 cursor-pointer rounded-md transition-all outline-0 hover:bg-aquamarine-700"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>

      <div className="my-8 text-center text-sm">
        <span className="">{togglePromptText} </span>
        <Link to={toggleLink} className="underline font-semibold">
          {buttonText === 'Sign Up' ? 'Sign In' : 'Sign Up'} Now
        </Link>
      </div>
    </section>
  );
};

export default AuthForm;
