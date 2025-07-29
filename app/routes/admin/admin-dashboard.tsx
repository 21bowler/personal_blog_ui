import { FileText, Users, TrendingUp, MessageSquare } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="space-y-6">
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
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              4 published articles, 2 drafts{' '}
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
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              1.2 comments per article avg.{' '}
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
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">1 administrators </p>
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
          <div className="flex items-start justify-between">
            <div>
              {/*should be a link */}
              <h4 className="font-medium hover:underline">
                Building APIs with Express and Node.js
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs bg-green-100 text-green-800`}
                >
                  published
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  design
                </span>
                <span className="text-xs text-muted-foreground">6/30/2025</span>
              </div>
            </div>
            {/*Article description */}
            <div className="text-muted-foreground text-sm">
              A step-by-step guide to building RESTful APIs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
