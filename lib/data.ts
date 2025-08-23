export const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Blog', link: '/blogs' },
  { name: 'About', link: '/#about' },
  { name: 'Contact', link: '/contact' },
];

export const adminLinks = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    name: 'All Articles',
    link: '/admin/all-articles',
  },
  {
    name: 'Comments',
    link: '/admin/comments',
  },
  {
    name: 'Create Article',
    link: '/admin/create-article',
  },
  {
    name: 'Users',
    link: '/admin/users',
  },
];

// Mock data for editor's picks
export const editorsPicks = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2024',
    tag: 'Technology',
    description:
      'Explore the latest trends and technologies shaping the future of web development.',
    author: 'Sam Wachira',
    image_url:
      '/placeholder.svg?height=300&width=400&text=Web+Development+Trends',
    created_at: '2025-01-15T10:30:00Z',
    slug: 'future-of-web-development-2024',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Scalable React Applications',
    tag: 'React',
    description:
      'Learn best practices for building React applications that scale.',
    author: 'Sam Wachira',
    image_url: '/placeholder.svg?height=300&width=400&text=React+Applications',
    created_at: '2025-01-10T08:00:00Z',
    slug: 'building-scalable-react-applications',
    featured: true,
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: When to Use What',
    tag: 'CSS',
    description: 'A comprehensive guide to understanding CSS layout methods.',
    author: 'Sam Wachira',
    image_url: '/placeholder.svg?height=300&width=400&text=CSS+Layout+Guide',
    created_at: '2025-01-08T15:30:00Z',
    slug: 'css-grid-vs-flexbox',
    featured: true,
  },
];

export const articleResources = [
  {
    title: 'The Future of User-Centered Design',
    tag: 'UX',
    date: 'Jun 22, 2025 | 6 min',
    description:
      'Exploring how empathy and usability testing are shaping the next generation of design systems.',
    author: 'Emily Zhao',
  },
  {
    title: "Minimalism Isn't Dead: Its Just smarter",
    tag: 'Design',
    date: 'May 15, 2025 | 4 min',
    description:
      'A closer look at how modern interfaces use space and typography to guide users effortlessly.',
    author: 'Carlos Rivera',
  },
  {
    title: 'When AI Meets UI: Designing with Generative Tools',
    tag: 'AI',
    date: 'Apr 28, 2025 | 7 min',
    description:
      'How generative AI is transforming wireframes, prototypes, and creative workflows in product teams.',
    author: 'Nia Patel',
  },
  {
    title: 'Designing for Accessibility Without Compromise',
    tag: 'Accessibility',
    date: 'Apr 9, 2025 | 5 min',
    description:
      "Learn how inclusive design doesn't mean sacrificing aesthetics or creativity.",
    author: 'Amina Khatri',
  },
  {
    title: 'State Management in 2025: A Frontend Perspective',
    tag: 'Frontend',
    date: 'Jun 4, 2025 | 8 min',
    description:
      'With React evolving and signals rising, which state tools are still worth using today?',
    author: 'Jonah Kim',
  },
  {
    title: 'The Invisible Layer: Microcopy That Makes a Difference',
    tag: 'Content',
    date: 'May 30, 2025 | 5 min',
    description:
      'Crafting interface text that guides, reassures, and delights users — without them noticing.',
    author: 'Taylor Monroe',
  },
  {
    title: 'The New Metrics of Product Success',
    tag: 'Product',
    date: 'Mar 22, 2025 | 6 min',
    description:
      'DAUs and NPS are just the start. Here’s what successful teams are tracking in 2025.',
    author: 'Priya Chandran',
  },
];
