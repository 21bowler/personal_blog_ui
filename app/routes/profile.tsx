import { fetchProfile, getCurrentSession } from '../../services/auth-service';
import { redirect, Form } from 'react-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import type { Route } from './+types/profile';

export async function clientLoader() {
  const session = await getCurrentSession();

  if (!session) {
    toast.error('You are not logged in.');
    return redirect('/auth/sign-in');
  }

  // pass the userId into the fetchProfile function
  const profile = await fetchProfile(session.user.id);

  if (!profile) {
    toast.error('No profile found for this user.');
    return {
      error: 'No profile found for this user.',
    };
  }

  return {
    email: session.user.email,
    avatarUrl: profile.avatar_url,
    username: profile.username,
    joinedAt: profile.created_at,
    provider: session.user.app_metadata?.provider,
  };
}

export function HydrateFallback() {
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Loader className="animate-spin size-10 text-gray-500" />
    </div>
  );
}

const Profile = ({ loaderData }: Route.ComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { username, avatarUrl, joinedAt, email, provider } = loaderData;

  const isEmailProvider = provider === 'email';

  return (
    <section className="container min-h-[calc(100vh-200px)] flex flex-col justify-center">
      <h1 className="text-xl text-center mb-3 md:text-2xl">
        <span className=" font-semibold text-burnham-800">User</span> Profile
      </h1>
      <div className="flex flex-col items-center justify-center">
        {/* Avatar Image */}
        <div>
          <img
            src={avatarUrl?.replace('=s96-c', '=s192-c')}
            alt={username}
            className="rounded-full w-24 h-24 object-cover"
            onError={(e) => {
              // If the modified URL fails, try the original URL
              if (e.currentTarget.src !== avatarUrl) {
                e.currentTarget.src = avatarUrl;
              } else {
                // If original URL also fails, use fallback
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  username,
                )}&background=random`;
              }
            }}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{username}</p>
          <span className="font-normal text-xs text-burnham-800">
            Joined in {joinedAt.split('-')[0]}
          </span>
        </div>

        {/* Form */}
        <Form method="post" className="w-full px-4 md:w-2/3 lg:w-1/2 mx-auto">
          <div className="space-y-3">
            <div className="">
              {actionData?.error && (
                <p className="bg-red-200/50 text-sm text-red-400 border flex gap-2 items-center border-red-100 rounded-md my-2 p-2">
                  <ExclamationTriangleIcon className="size-4" />
                  {actionData.error}
                </p>
              )}
            </div>

            {/* email div wrapper */}
            <div className="">
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                className="border bg-gray-100 cursor-not-allowed  opacity-75 border-gray-300 text-sm text-gray-700 rounded-md w-full px-4 py-2 outline-none"
                defaultValue={email}
                disabled
              />
            </div>

            {isEmailProvider && (
              <>
                {/* password wrapper */}
                <div className="">
                  <label htmlFor="password" className="block text-sm mb-1">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="border border-gray-300 text-sm text-gray-700 rounded-md w-full px-4 py-2 outline-none"
                      placeholder="Enter password"
                    />
                    <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="relative justify-center cursor-pointer border border-gray-400 inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 text-xs px-2.5 py-1 h-[26px]"
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

                {/* confirm-password wrapper */}
                <div className="">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-1"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="border border-gray-300 text-sm text-gray-700 rounded-md w-full px-4 py-2 outline-none"
                      placeholder="Confirm password"
                    />
                    <div className="absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="relative justify-center cursor-pointer border border-gray-400 inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 text-xs px-2.5 py-1 h-[26px]"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-burnham-500 cursor-pointer text-white font-regular text-sm px-4 py-2 rounded-md outline-none hover:bg-burnham-600 transition-all duration-200 ease-in-out"
                >
                  Save Changes
                </button>
              </>
            )}

            {!isEmailProvider && (
              <p className="text-sm font-regular text-gray-800 text-center">
                Password Management is handled by{' '}
                <span className="font-medium">Google Authentication.</span>
              </p>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Profile;
