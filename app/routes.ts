import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('blogs', 'routes/blog.tsx'),
  route('article/:slug', 'routes/blog-details.tsx'),

  // Nested admin routes
  route('admin', 'routes/admin/admin-layout.tsx', [
    route('', 'routes/admin/welcome-admin.tsx'),
    route('dashboard', 'routes/admin/admin-dashboard.tsx'),
    route('all-articles', 'routes/admin/admin-articles.tsx'),
    route('comments', 'routes/admin/admin-comments.tsx'),
    route('create-article', 'routes/admin/create-article.tsx'),
    route('users', 'routes/admin/admin-users.tsx'),
    route('edit-article/:id', 'routes/admin/edit-article.tsx'),
  ]),

  route('/profile', 'routes/profile.tsx'),
  route('*', 'routes/not-found.tsx'),

  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
] satisfies RouteConfig;
