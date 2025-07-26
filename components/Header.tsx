import { useState, useEffect, useCallback, useRef } from 'react';
import { navLinks } from '../lib/data';
import { Link, NavLink } from 'react-router';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import { supabase } from '../app/supabase-client';
import { type Subscription, type User } from '@supabase/supabase-js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // This closes menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // This useEffect handles the initial session check and user fetch
  useEffect(() => {
    let subscription: Subscription | null = null; //initially be null

    const initAuth = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting initial session:', sessionError);
      }

      // console.log('Initial session check result (Browser):', session);

      // 2. Based on the session, get the user.
      if (session) {
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.error(
            'Error getting user from session (Browser):',
            userError,
          );
          setUser(null); // Clear user if there's an error getting user despite session
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }

      setLoadingSession(false); // Session check complete

      // 3. Listen for future auth state changes
      subscription = supabase.auth.onAuthStateChange(
        (_event, currentSession) => {
          // console.log('Auth state changed (Browser):', _event, currentSession);
          setUser(currentSession?.user || null);
        },
      ).data.subscription;
    };

    initAuth();

    // clean-up function for unsubscribing from auth changes
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  //TODO1: add useCallback for Optimization
  const changeBackground = useCallback(() => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);

    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`container border flex justify-between items-center border-green-700 ${
        navbar ? 'navbar active' : 'navbar'
      }`}
    >
      <div>
        <Link to="/">
          <h1 className="font-bold text-2xl">Devish</h1>
        </Link>
      </div>

      {/* Desktop Menu*/}
      <div className="hidden md:block">
        <nav>
          <div className="flex gap-4">
            {navLinks.map(({ name, link }) => (
              <NavLink
                to={link}
                key={name}
                className={({ isActive }) =>
                  isActive ? 'font-medium underline' : 'hover:text-gray-600'
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/*  Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        {!user && <AuthButton user={user} variant="mobile" />}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={toggleMenuOpen}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/*  Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bg-white shadow-lg top-12 right-4 rounded-b-lg w-64 p-4 z-50 md:hidden"
        >
          <nav className="space-y-1 px-2 pb-3 pt-2">
            <div className="flex flex-col items-center gap-4">
              {navLinks.map(({ name, link }) => (
                <NavLink
                  to={link}
                  key={name}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm ${
                      isActive
                        ? 'font-medium bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </NavLink>
              ))}
            </div>
            {/* Show user info and auth buttons at the top of mobile menu when logged in */}
            {user && (
              <AuthButton
                user={user}
                variant="mobile"
                onAction={() => setIsMenuOpen(false)}
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
