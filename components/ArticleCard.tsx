import { UserIcon, ArrowUpRightIcon, Tag, Calendar } from 'lucide-react';
import { formatDate, formatIntl } from '../lib/utility';
import { Link } from 'react-router';
import { Badge } from '~/components/ui/badge';

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
        <img
          src={imgUrl}
          alt={title}
          className="rounded-md w-full h-48 object-cover"
        />
      </div>
      <div>
        <Badge variant="secondary" className="mb-3">
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Badge>
        <Link to={`/article/${slug}`} className="group">
          <div className="card-title">
            <h3>{title}</h3>
            <ArrowUpRightIcon className="w-6 h-6" />
          </div>
          {/*<p className="article-date">{formatDate(date)}</p>*/}
          <p className="article-description">{description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="author">
              <UserIcon className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatIntl(date)}
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
