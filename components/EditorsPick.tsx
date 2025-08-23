import React from 'react';
import AuthorMeta from './AuthorMeta';
import { Badge } from '~/components/ui/badge';
import { StarIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import { editorsPicks } from '../lib/data';
import ArticleCard from './ArticleCard';

const EditorsPick = () => {
  return (
    <section className="container mb-16">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {editorsPicks.map((article, index) => (
            <div
              key={article.id}
              className={` ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <ArticleCard
                title={article.title}
                author={article.author}
                tag={article.tag}
                date={article.created_at}
                description={article.description}
                imgUrl={article.image_url}
                slug={article.slug}
              />
            </div>
          ))}
        </div>

        {/*  view all */}
        <div className="mt-12 text-center">
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
