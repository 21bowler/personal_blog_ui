import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { formatDate } from '../lib/utility';
import { Link } from 'react-router';

interface ArticleResourceProps {
  title: string;
  tag?: string;
  date: string;
  description: string;
  imgUrl: string;
  author: string;
  slug: string;
}

const ArticleCard = ({
  title,
  tag,
  date,
  description,
  imgUrl,
  author,
  slug,
}: ArticleResourceProps) => {
  return (
    <article className="container article-card">
      <div>
        {/*<div className="img-pulse" />*/}
        <img
          src={imgUrl}
          alt={title}
          className="rounded-md w-full h-48 object-cover"
        />
      </div>
      <div>
        <div>
          <span className="tag">{tag}</span>
        </div>
        <Link to={`/article/${slug}`} className="group">
          <div className="card-title">
            <h3>{title}</h3>
            <ArrowUpRightIcon className="w-6 h-6" />
          </div>
          <p className="article-date">{formatDate(date)}</p>
          <p className="article-description">{description}</p>
          <div className="author">
            <div className="avatar" />
            <span>{author}</span>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
