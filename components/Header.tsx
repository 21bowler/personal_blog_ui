import { useState } from 'react';
import { navLinks } from '../lib/data';
import { Link, NavLink } from 'react-router';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`container ${navbar ? 'navbar active' : 'navbar'}`}>
      <div>
        <Link to="/">
          <h1 className="font-bold text-2xl">DevLog</h1>
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
      <div className="md:hidden">
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
        <div className="absolute bg-white shadow-lg top-16 right-20 rounded-b-lg w-64 p-4 z-50 md:hidden">
          <nav className="space-y-1 px-2 pb-3 pt-2">
            <div className="flex flex-col items-center gap-4">
              {navLinks.map(({ name, link }) => (
                <NavLink
                  to={link}
                  key={name}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base ${
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
          </nav>
        </div>
      )}
    </section>
  );
};

export default Header;
