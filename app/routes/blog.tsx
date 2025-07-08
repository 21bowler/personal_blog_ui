import type { Route } from './+types/blog';
import { useState } from 'react';
import BlogHeroSection from '../../components/BlogHeroSection';
import ArticleCard from '../../components/ArticleCard';
import { articleResources } from '../../lib/data';
import Pagination from '../../components/Pagination';
import { fetchAllArticles } from 'services/articleService';

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
        <BlogHeroSection />

        {/*Blog cards below*/}
        <div className="articles-grid mb-10 container">
          {currentArticles.map(
            ({ title, description, tag, date, author, image_url }) => (
              <ArticleCard
                key={title}
                title={title}
                description={description}
                imgUrl={image_url}
                tag={tag}
                date={date}
                author={author}
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
