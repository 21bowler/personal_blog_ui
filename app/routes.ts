import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('blogs', 'routes/blog.tsx'),
  route('admin/create-article', 'routes/admin/create-article.tsx'),
] satisfies RouteConfig;
