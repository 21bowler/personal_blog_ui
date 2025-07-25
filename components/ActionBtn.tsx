import { Link } from 'react-router';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// read more bg-color: #00561D, About me bg-color: #ffffff
export default function ActionButton() {
  return (
    <Link
      to="/"
      className="flex text-xs items-center gap-4 py-2 bg-burnham-800 text-white px-4 rounded-full transition-all hover:shadow-lg hover:bg-[#007A2D]"
    >
      Read more
      <span className="p-2 rounded-full bg-white">
        <ArrowRightIcon className="size-3 stroke-black rounded-full" />
      </span>
    </Link>
  );
}
