import BlogDetails from '../../components/BlogDetails';
import BlogHeroSection from '../../components/BlogHeroSection';
import ArticleCard from '../../components/ArticleCard';
import { articleResources } from '../../lib/data';

const Blog = () => {
  return (
    <section className="container">
      <div>
        <BlogHeroSection />

        {/*Blog cards below*/}
        <div className="articles-grid mb-10 container">
          {articleResources.map(({ title, description, tag, date, author }) => (
            <ArticleCard
              key={title}
              title={title}
              description={description}
              tag={tag}
              date={date}
              author={author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
