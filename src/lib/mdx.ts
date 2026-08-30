import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...(data as BlogFrontmatter),
        content,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Frontmatter only, without the article bodies.
 *
 * The listing page never renders the body, and carrying 100 full articles
 * through it just to show 12 cards is wasted memory at build time.
 */
export function getAllPostSummaries(): Omit<BlogPost, 'content'>[] {
  return getAllPosts().map((post) => {
    const summary: Omit<BlogPost, 'content'> & { content?: string } = { ...post };
    delete summary.content;
    return summary;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...(data as BlogFrontmatter),
      content,
    };
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
