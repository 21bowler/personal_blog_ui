import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-8xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found!
          </h2>
          <p className="text-muted-foreground text-sm">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-gray-300 text-center p-4 rounded-lg text-sm"
          >
            Return Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm text-white font-medium p-4 bg-burnham-700 rounded-lg transition-all duration-300 ease-in hover:bg-burnham-800"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
