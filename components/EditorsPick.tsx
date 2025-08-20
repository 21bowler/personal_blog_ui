import React from 'react';
import AuthorMeta from './AuthorMeta';
import { Badge } from '~/components/ui/badge';
import { StarIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';

const EditorsPick = () => {
  return (
    <section className="container mb-16">
      <div className="">
        <div className="text-center mt-10 mb-16">
          <Badge variant="secondary" className="mb-4">
            <StarIcon className="size-4 mr-1" />
            Editor's Pick
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked articles that showcase the latest trends, best
            practices, and innovative solutions in web development.
          </p>
        </div>

        {/* Editor's cards */}

        <div className="my-6 flex flex-col items-center gap-4 sm:flex-row">
          <div className="w-full sm:w-100">
            <div className="w-full h-96 rounded-lg bg-gray-400 animate-pulse sm:w-100" />
          </div>
          <div className="editors-pick-content">
            <span className="text-burnham-500 text-sm">Javascript</span>
            <h4 className="font-semibold text-lg mb-4">
              Minimalism Isn't Dead: Its Just Smarter.
            </h4>
            <p className="text-sm sm:text-base text-gray-600">
              In this post, I break down how sharing your journey online
              accelerates learning, builds accountability, and connects you with
              a supportive dev community
            </p>
            {/*Author metadata */}
            <AuthorMeta justify="justify-start" />
            <div className="inline-block mt-4 sm:mt-0">
              {/*<ActionButton />*/}
            </div>
          </div>
        </div>

        {/*  view all */}
        <div>
          <Button asChild variant="outline">
            <Link to="/blogs">
              View All Articles
              <ArrowRightIcon className="size-5" />{' '}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
