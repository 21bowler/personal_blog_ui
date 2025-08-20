import { Link } from 'react-router';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { StarIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

const HeroSection = () => {
  return (
    <>
      <section className="container">
        <div className="relative space-y-2 py-22 ">
          <div>
            <Badge variant="secondary" className="mb-4">
              <StarIcon className="size-4" />
              Welcome to devish
            </Badge>
          </div>

          <h2 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
            Code. <span className="text-blue-600">Create</span>. Share
          </h2>
          <p className="text-xl text-muted-foreground sm:w-1/2">
            Devish is where I share Web Development Tutorials, thoughts, and
            experiments from my coding Journey.
          </p>
          <div className="flex items-center py-2 gap-4">
            <Button
              asChild
              size="sm"
              className="bg-burnham-600 transition-colors hover:bg-burnham-700"
            >
              <Link to="/blogs">
                Explore Articles
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Link to="#about">Learn More</Link>
            </Button>
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
        className="flex flex-col text-center bg-muted space-y-4 py-[2rem]"
      >
        <h3 className="text-3xl md:text-4xl font-bold">About Devish</h3>
        <p className="text-xl px-2 self-center text-muted-foreground space-y-2  sm:w-1/2">
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
