import { Link } from 'react-router';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

const WelcomeAdmin = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center p-6 text-center">
      <div className="space-y-8 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <p className="text-lg text-muted-foreground animate-in fade-in delay-300 duration-700">
          Manage your articles, comments and user profiles.
        </p>

        <div className="flex justify-center pt-4 animate-in fade-in delay-500 duration-700">
          <Link
            to="/admin/dashboard"
            className="bg-black text-gray-200 px-4 py-2 rounded-sm text-sm flex items-center gap-2"
          >
            <LayoutDashboard className="size-4" />
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
