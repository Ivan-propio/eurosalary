// ============================================
// Blog post data — all posts in 24 EU languages
// Architecture: every new post MUST have all 24
// language keys for title, slug, excerpt, content.
// ============================================

export interface BlogPost {
  id: string;
  title: Record<string, string>;
  slug: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  image: string;
  imageAlt: string;
  date: string;
  tags: string[];
}

// Posts will be added here — each one fully translated from day one.
export const blogPosts: BlogPost[] = [];

/** Helper: find a blog post by its localized slug */
export function getBlogPostBySlug(slug: string, lang: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug[lang] === slug);
}

/** Helper: get all blog posts except the one with the given id */
export function getRelatedPosts(currentId: string): BlogPost[] {
  return blogPosts.filter((post) => post.id !== currentId);
}
