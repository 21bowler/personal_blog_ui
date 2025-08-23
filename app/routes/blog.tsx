import type { Route } from './+types/blog';
import { useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import Pagination from '../../components/Pagination';
import { fetchAllArticles } from 'services/articleService';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { StarIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

const ITEMS_PER_PAGE = 6;

export async function loader() {
  try {
    const allArticles = await fetchAllArticles();

    return { allArticles };
  } catch (e) {
    console.error('Loader Error: could not load articles', e);

    throw e;
  }
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  // Pass the fetched articles to the component
  const fetchedArticles = loaderData.allArticles;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const totalPages = Math.ceil(fetchedArticles.length / ITEMS_PER_PAGE);
  const indexOfStartArticle = (currentPage - 1) * ITEMS_PER_PAGE;
  const indexOfLastArticle = indexOfStartArticle + ITEMS_PER_PAGE;
  const currentArticles = fetchedArticles.slice(
    indexOfStartArticle,
    indexOfLastArticle,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container">
      <div>
        {/*<BlogHeroSection />*/}
        {/* search functionality */}
        <div className="hero container">
          <Badge variant="secondary">
            <StarIcon className="w-4 h-4 mr-1" />
            Our Blog
          </Badge>
          <div>
            <h2>All Articles</h2>
            <p>A blog about development, Learning and New Technologies</p>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute top-2.5 size-5 left-3 text-gray-600 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for article"
                className="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/*Blog cards below*/}
        <div className="articles-grid mb-10 container">
          {currentArticles
            .filter((article) => {
              return search.toLowerCase() === ''
                ? article
                : article.title.toLowerCase().includes(search.toLowerCase());
            })
            .map(
              ({
                title,
                description,
                tag,
                author,
                image_url,
                created_at,
                slug,
              }) => (
                <ArticleCard
                  key={title}
                  title={title}
                  description={description}
                  imgUrl={image_url}
                  tag={tag}
                  date={created_at}
                  author={author}
                  slug={slug}
                />
              ),
            )}
        </div>

        {/*  Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Blog;
