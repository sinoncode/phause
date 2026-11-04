
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-cybersecurity-matters",
    title: "Why Cybersecurity Matters for Modern Businesses",
    excerpt:
      "Discover why protecting your digital infrastructure is essential for business continuity, customer trust and long-term growth.",
    category: "Cybersecurity",
    date: "October 20, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",
    author: "Phause Team",
    content: [
      "Technology has become central to how modern businesses operate. From customer information to internal systems, organisations depend on digital infrastructure every day.",
      "Cybersecurity helps protect these systems from unauthorised access, data loss and disruption. A thoughtful security strategy is not just an IT requirement; it is an important part of business continuity.",
      "Businesses should take a proactive approach by reviewing access permissions, keeping software updated, educating employees and monitoring their systems.",
      "The right cybersecurity practices help organisations reduce risk, protect customer trust and operate with greater confidence."
    ],
  },
  {
    slug: "building-a-smarter-it-infrastructure",
    title: "Building a Smarter IT Infrastructure",
    excerpt:
      "Learn how a reliable and scalable IT foundation can help your organisation work more efficiently.",
    category: "IT Infrastructure",
    date: "October 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    author: "Phause Team",
    content: [
      "A dependable IT infrastructure supports the everyday activities of a modern organisation.",
      "A well-planned environment brings together networks, devices, software and support processes so teams can work effectively.",
      "Regular maintenance, clear documentation and scalable systems help businesses prepare for changing operational needs."
    ],
  },
  {
    slug: "the-value-of-managed-it-services",
    title: "The Value of Managed IT Services",
    excerpt:
      "Explore how ongoing IT support and maintenance can reduce complexity and keep business operations running.",
    category: "Managed Services",
    date: "October 10, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    author: "Phause Team",
    content: [
      "Managing technology internally can require significant time, resources and specialist knowledge.",
      "Managed IT services provide ongoing support for systems, infrastructure and day-to-day technical requirements.",
      "With a consistent support approach, businesses can focus more attention on their core activities while keeping their technology maintained."
    ],
  },
];

export const blogCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((post) => post.category))),
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
