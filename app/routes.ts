import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('blogs', 'routes/blog.tsx'),
  route('admin/create-article', 'routes/admin/create-article.tsx'),
  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
] satisfies RouteConfig;
