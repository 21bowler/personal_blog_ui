import { Link } from 'react-router';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const HeroSection = () => {
  return (
    <section className="container">
      <div className="space-y-2 py-22">
        {/*<div className="w-full border-2 h-full" />*/}
        <h2 className="font-bold text-3xl sm:text-5xl ">Code. Create. Share</h2>
        <p className="text-gray-600 sm:w-1/2">
          Devish is where I share Web Development Tutorials, thoughts, and
          experiments from my coding Journey.
        </p>
        <div className="flex items-center py-2 gap-4">
          <Link
            to="/"
            className="flex items-center gap-4 bg-[#00561D] text-white py-2 px-4 rounded-full transition-all hover:shadow-lg hover:bg-[#007A2D]"
          >
            Read More
            <span className="px-1.5 py-1 rounded-full bg-white">
              <ArrowRightIcon className="size-5 fill-black rounded-full" />
            </span>
          </Link>
          <Link
            to="#"
            className=" bg-white  rounded-full py-2 px-8 hover:shadow-lg transition-all"
          >
            About Me
          </Link>
        </div>

        {/*  Explore More btn*/}
        <div>
          <Link to="#" className="flex items-center">
            Explore More <ArrowDownIcon className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
