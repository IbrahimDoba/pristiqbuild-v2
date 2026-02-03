export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
}
