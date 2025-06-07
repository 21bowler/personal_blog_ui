import { navLinks } from '../lib/data';
import { Link, NavLink } from 'react-router';

const Header = () => {
  return (
    <section className="flex justify-between items-center p-4">
      <div>
        <Link to="/">
          <h1 className="font-bold text-2xl">DevLog</h1>
        </Link>
      </div>

      <div>
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
    </section>
  );
};

export default Header;
