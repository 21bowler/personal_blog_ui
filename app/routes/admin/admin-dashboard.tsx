import {
  FileText,
  Users,
  TrendingUp,
  MessageSquare,
  Loader,
} from 'lucide-react';
import {
  fetchLatestArticles,
  fetchTotalArticles,
} from '../../../services/articleService';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getTotalUsers } from '../../../services/auth-service';
import { getTotalCommentsCount } from '../../../services/comment-service';
import { formatIntl } from '../../../lib/utility';

type UserStats = {
  count: number | null;
  profileRole: number | null;
};

type Article = {
  author: string;
  content: string;
  created_at: string;
  description: string;
  id: number;
  image_url: string;
  published: boolean;
  slug: string;
  tag: string;
  title: string;
};

function AdminDashboard() {
  const [totalArticles, setTotalArticles] = useState<number | null>(null);
  const [totalComments, setTotalComments] = useState<number | null>(null);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    count: null,
    profileRole: null,
  });

  fetchTotalArticles()
    .then((total) => setTotalArticles(total))
    .catch((err) => console.error(err));

  useEffect(() => {
    getTotalUsers()
      .then((stats) => setUserStats(stats))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getTotalCommentsCount()
      .then((total) => setTotalComments(total))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const getLatest = async () => {
      const latest = await fetchLatestArticles();
      setLatestArticles(latest);
      console.log('latest articles: ', latest);
    };

    getLatest();
  }, []);

  return (
    <div className="space-y-6 my-6">
      <div>
        <h1 className="text-3xl tracking-tight font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of my content Management System
        </p>
      </div>

      <div className="grid grid-cols-1 mb-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Articles card */}
        <div className="rounded-lg border p-6 border-gray-300 text-card-foreground shadow-sm">
          <div className="flex items-center space-y-0 pb-2 justify-between">
            <h4 className="text-sm font-medium">Total Articles</h4>
            <FileText className="size-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {totalArticles !== null ? (
                totalArticles
              ) : (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalArticles !== null
                ? `${totalArticles} published articles`
                : `Loading...`}
            </p>
          </div>
        </div>

        {/* Total Comments card */}
        <div className="rounded-lg border p-6 border-gray-300 text-card-foreground shadow-sm">
          <div className="flex items-center space-y-0 pb-2 justify-between">
            <h4 className="text-sm font-medium">Total Comments</h4>
            <MessageSquare className="size-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {totalComments !== null ? (
                totalComments
              ) : (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalComments !== null && totalArticles !== null
                ? `${(totalComments / totalArticles).toFixed(
                    1,
                  )} comments per article avg.`
                : 'Loading..'}
            </p>
          </div>
        </div>

        {/* Registered users card */}
        <div className="rounded-lg border p-6 border-gray-300 text-card-foreground shadow-sm">
          <div className="flex items-center space-y-0 pb-2 justify-between">
            <h4 className="text-sm font-medium">Registered Users</h4>
            <Users className="size-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {userStats.count !== null ? (
                userStats.count
              ) : (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {userStats.profileRole !== null
                ? `${userStats.profileRole} administrator`
                : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Engagement Rate card */}
        <div className="rounded-lg border p-6 border-gray-300 text-card-foreground shadow-sm">
          <div className="flex items-center space-y-0 pb-2 justify-between">
            <h4 className="text-sm font-medium">Engagement Rate</h4>
            <TrendingUp className="size-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month.{' '}
            </p>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-gray-300 p-4 rounded-lg">
          <div>
            <h5 className="text-lg font-semibold">Articles by Tag</h5>
            <p className="text-sm text-muted-foreground">
              Distribution of articles across different categories.
            </p>
          </div>

          {/* Bar Chart below -- installed later. */}
          <div className="bg-gray-200 rounded-md animate-pulse h-54 mt-3"></div>
        </div>
        {/*  Comment Activity */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <div>
            <h5 className="text-lg font-semibold">Comment Actvity</h5>
            <p className="text-sm text-muted-foreground">
              User engagement over the last 6 months.
            </p>
          </div>

          {/* Line Chart below -- install later. */}
          <div className="bg-gray-200 rounded-md animate-pulse h-54 mt-3"></div>
        </div>
      </div>

      {/*  Latest Articles */}
      <div className="border border-gray-300 p-4 mb-4 rounded-lg mt-3">
        <div>
          <h4 className="font-semibold text-2xl">Latest Articles</h4>
          <p className="text-muted-foreground text-sm">
            Recently created or updated articles.
          </p>
        </div>

        {/*  looped latest articles */}
        <div className="space-y-3 mt-4">
          {latestArticles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col md:flex-row items-start justify-between border-b border-gray-300 mb-4 pb-4 md:border-none md:mb-0 "
            >
              <div>
                <Link
                  to={`/article/${article.slug}`}
                  className="font-medium hover:underline"
                >
                  {article.title}
                </Link>
                <div className="w-full flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs bg-green-100 text-green-800`}
                  >
                    {article.published ? 'published' : 'draft'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {article.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatIntl(article.created_at)}
                  </span>
                </div>
              </div>
              {/*Article description */}
              <div className="line-clamp-1 md:line-clamp-none text-muted-foreground text-sm">
                {article.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
