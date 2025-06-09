import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

const ArticleCard = () => {
  return (
    <article className="container article-card">
      <div>
        <div className="bg-gray-400 rounded-lg w-full h-40 animate-pulse" />
      </div>
      <div>
        <div>
          <span className="text-sm text-blue">Software Engineering</span>
        </div>
        <div className="card-title">
          <h3>Build Your API Stack</h3>
          <ArrowUpRightIcon className="w-4 h-4" />
        </div>
        <p className="text-sm text-gray-500 mt-1">Jun 21, 2025 | 11 min read</p>
        <p>
          The rise of RESTful APIs has been met by rise in tools for creating,
          testing and managing team.
        </p>
        <div className="author">
          <div className="bg-gray-400 rounded-full w-10 h-10" />
          <span>Jane Doe</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
