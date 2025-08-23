import type { User } from '@supabase/supabase-js';
import { Link, useNavigate } from 'react-router';
import { UserCircleIcon, TrashIcon, UserIcon } from '@heroicons/react/24/solid';
import { LayoutDashboardIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {
  getProfileUser,
  signOut,
  getCurrentSession,
} from '../services/auth-service';

type AuthButtonsProps = {
  user: User | null;
  variant: 'desktop' | 'mobile';
  onAction?: () => void; // Optional callback for mobile menu closing
};

type UserRole = {
  role: string;
};

export const AuthButton = ({ user, variant, onAction }: AuthButtonsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const role = await getProfileUser(user.id);
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchProfile().catch(console.error);
  }, [user]);

  useEffect(() => {
    if (variant === 'desktop') {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [variant]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
      if (onAction) onAction();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <Link
        to="/auth/sign-in"
        className="text-sm text-white bg-burnham-700 rounded-md px-2.5 py-1 cursor-pointer hover:bg-burnham-800"
        onClick={onAction}
      >
        Sign In
      </Link>
    );
  }

  if (variant === 'mobile') {
    return (
      <>
        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
          {user.email}
        </div>
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onAction}
        >
          Profile
        </Link>
        <button
          onClick={handleSignOut}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    // Drop-down menu wrapper div
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <UserCircleIcon className="w-8 h-8 text-gray-700" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-54 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
            {user.email}
          </div>
          {userRole?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              <LayoutDashboardIcon className="w-5 h-5 mr-2" />
              Admin Dash
            </Link>
          )}
          <Link
            to="/profile"
            className=" flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full flex items-center text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
