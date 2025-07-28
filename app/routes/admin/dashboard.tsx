import { Link, Outlet, redirect } from 'react-router';
import { Loader } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { adminLinks } from '../../../lib/data';
import {
  getCurrentSession,
  getProfileUser,
} from '../../../services/auth-service';
import { toast } from 'sonner';

export const clientLoader = async () => {
  //1. get session
  const session = await getCurrentSession();

  //2. redirect the user if there is no session
  if (!session) {
    return redirect('/auth/sign-in');
  }

  // get user id from session
  const userId = session.user.id;

  //3. fetch user's role
  const profile = await getProfileUser(userId);

  //4. redirect user to home if the role is not admin
  if (!profile || profile.role !== 'admin') {
    toast.error('You are not authorized to access this page');
    return redirect('/');
  }

  return null;
};

// For better UX
export function HydrateFallback() {
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Loader className="animate-spin size-10 text-gray-500" />
    </div>
  );
}

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="container flex flex-col md:flex-row">
      <aside className="hidden sm:w-[16.25rem] sticky top-[4.25rem] h-[50rem] text-white p-6 md:block">
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xl text-gray-900 sm:text-2xl mb-10 font-semibold tracking-wide">
              Admin Panel
            </div>

            {/*Desktop Navigation*/}
            <nav className="space-y-4">
              {adminLinks.map(({ name, link }) => (
                <Link
                  key={name}
                  to={link}
                  className="flex items-center px-2.5 py-1.5 rounded-md text-gray-900 text-sm font-medium hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out group"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="text-sm text-gray-900 mt-10">
            Developed by 👨‍💻 Sam Wachira.
            {/* TODO: Logout button here*/}
          </div>
        </div>
      </aside>

      {/*  Mobile Navigation */}
      <div className="">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-sm border border-gray-300 shadow-sm text-left ml-4 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out inline-block"
        >
          Admin Menu &darr;
        </button>

        {menuOpen && (
          <div
            className="bg-white shadow-lg absolute rounded-lg w-48 p-6 left-8"
            ref={menuRef}
          >
            <nav className="space-y-4">
              {adminLinks.map(({ name, link }) => (
                <Link
                  key={name}
                  to={link}
                  className="flex items-center px-2.5 py-1.5 rounded-md text-gray-900 text-sm font-medium hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out group"
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Main Nested Content/Components */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
