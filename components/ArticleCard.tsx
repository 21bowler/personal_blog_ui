import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

interface ArticleResourceProps {
  title: string;
  tag?: string;
  date: string;
  description: string;
  author: string;
}

const ArticleCard = ({
  title,
  tag,
  date,
  description,
  author,
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
        <div className="card-title">
          <h3>{title}</h3>
          <ArrowUpRightIcon className="w-6 h-6" />
        </div>
        <p className="article-date">{date}</p>
        <p className="article-description">{description}</p>
        <div className="author">
          <div className="avatar" />
          <span>{author}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
