import { Link } from 'react-router';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const HeroSection = () => {
  return (
    <>
      <section className="container">
        <div className="space-y-2 py-22 border-2 ">
          {/*<div className="w-full border-2 h-full" />*/}
          <h2 className="font-bold text-3xl sm:text-5xl ">
            Code. Create. Share
          </h2>
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
          <div className="flex">
            <Link to="#" className="flex gap-3 items-center">
              Explore More{' '}
              <span className="px-1.5 py-1 rounded-full bg-gray-200">
                <ArrowDownIcon className="size-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-center space-y-4 text-white bg-[#0A190F] container py-10">
        <h3 className="text-3xl font-bold">About Devish</h3>
        <p className="text-base text-amber-100 w-full sm:max-w-96 border-red-400">
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
