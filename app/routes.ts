import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index('routes/home.tsx'),
  route('/blogs', 'routes/blog.tsx'),
] satisfies RouteConfig;
