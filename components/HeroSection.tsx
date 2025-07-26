import { Link } from 'react-router';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import ActionButton from './ActionBtn';

const HeroSection = () => {
  return (
    <>
      <section className="container">
        <div className="relative space-y-2 py-22 ">
          <h2 className="font-bold text-3xl sm:text-5xl ">
            Code. <span className="text-blue-600">Create</span>. Share
          </h2>
          <p className="text-base text-gray-600 sm:w-1/2">
            Devish is where I share Web Development Tutorials, thoughts, and
            experiments from my coding Journey.
          </p>
          <div className="flex items-center py-2 gap-4">
            <ActionButton />
            <Link
              to="/"
              className="flex text-sm items-center gap-4 bg-white text-black py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-md"
            >
              Read more
            </Link>
          </div>

          {/*  Explore More btn*/}
          <div className="flex absolute bottom-3 right-0">
            <Link to="#" className="flex text-sm gap-3 items-center">
              Explore More{' '}
              <span className="p-2 rounded-full bg-gray-200">
                <ArrowDownIcon className="size-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Devish Section */}
      <section
        id="about"
        className="flex flex-col text-center space-y-4 text-white bg-[#0A190F] py-[2rem]"
      >
        <h3 className="text-3xl font-bold">About Devish</h3>
        <p className="text-sm sm:text-base px-2 self-center space-y-2 text-amber-100 sm:w-1/2">
          Devlog is my personal blog where I document my journey as a developer
          — from building side projects and learning new tech to sharing
          tutorials and insights. It's a space to learn in public, grow through
          writing, and connect with like-minded devs.
        </p>
      </section>
    </>
  );
};

export default HeroSection;
