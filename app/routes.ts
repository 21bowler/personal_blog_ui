import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('blogs', 'routes/blog.tsx'),
  route('article/:slug', 'routes/blog-details.tsx'),

  // Nested admin routes
  route('admin', 'routes/admin/dashboard.tsx', [
    route('all-articles', 'routes/admin/admin-articles.tsx'),
    route('create-article', 'routes/admin/create-article.tsx'),
    route('edit-article/:id', 'routes/admin/edit-article.tsx'),
  ]),
  route('/profile', 'routes/profile.tsx'),

  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
] satisfies RouteConfig;
