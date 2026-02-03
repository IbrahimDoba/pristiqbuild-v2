import { MDXRemote } from 'next-mdx-remote/rsc';
import SafeImage from './SafeImage';

// Custom MDX components with proper styling
const mdxComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-steel-900 leading-tight scroll-mt-24"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-steel-900 leading-snug scroll-mt-24"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-steel-900 leading-snug scroll-mt-24"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg md:text-xl font-semibold mt-6 mb-3 text-steel-900 scroll-mt-24"
      {...props}
    />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="text-base md:text-lg font-semibold mt-5 mb-2 text-steel-800 scroll-mt-24"
      {...props}
    />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="text-sm md:text-base font-semibold mt-4 mb-2 text-steel-800 scroll-mt-24"
      {...props}
    />
  ),

  // Paragraphs
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-base md:text-lg leading-relaxed mb-6 text-steel-700"
      {...props}
    />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 mb-8 space-y-3 text-steel-700 marker:text-primary-600"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 mb-8 space-y-3 text-steel-700 marker:text-primary-600 marker:font-semibold"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base md:text-lg leading-relaxed text-steel-700 pl-2">
      {props.children}
    </li>
  ),

  // Blockquote
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary-500 pl-6 py-4 my-8 italic text-steel-600 bg-primary-50/50 rounded-r-lg"
      {...props}
    />
  ),

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),

  // Emphasis
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-steel-900" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-steel-700" {...props} />
  ),

  // Code
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-primary-50 px-2 py-1 rounded text-sm font-mono text-primary-700 border border-primary-100 break-words"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-steel-900 text-steel-100 p-6 rounded-lg overflow-x-auto mb-8 shadow-lg text-sm leading-relaxed"
      {...props}
    />
  ),

  // Horizontal Rule
  hr: () => (
    <hr className="my-12 border-t-2 border-steel-200" />
  ),

  // Tables
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-8">
      <table
        className="w-full border-collapse border border-steel-300 text-steel-700"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-primary-50" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-steel-200 last:border-b-0" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-steel-900 border-b-2 border-primary-300"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="px-4 py-3 border-b border-steel-200" {...props} />
  ),

  // Images - using SafeImage for better error handling
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      <SafeImage
        src={typeof src === 'string' ? src : ''}
        alt={alt || ''}
        width={800}
        height={500}
        className="rounded-lg shadow-md w-full h-auto"
      />
      {alt && (
        <figcaption className="text-center text-sm text-steel-500 mt-3 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Custom wrapper for article content
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="mdx-content">{children}</div>
  ),
};

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  // Pre-process the content to fix common formatting issues
  const processedSource = preprocessMdx(source);

  return (
    <div className="mdx-prose">
      <MDXRemote source={processedSource} components={mdxComponents} />
    </div>
  );
}

// Preprocess MDX content to fix formatting issues
function preprocessMdx(content: string): string {
  return (
    content
      // Ensure proper paragraph separation (add blank lines between text blocks)
      .replace(/([a-zA-Z.,;:!?])\n([A-Z])/g, '$1\n\n$2')
      // Fix multiple consecutive blank lines (reduce to 2)
      .replace(/\n{3,}/g, '\n\n')
      // Ensure headings have space before them
      .replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2')
      // Ensure lists have proper spacing
      .replace(/([^\n])\n(-|\d+\.)\s/g, '$1\n\n$2 ')
      // Ensure blockquotes have space before them
      .replace(/([^\n])\n(>)/g, '$1\n\n$2')
      // Trim excessive whitespace at end
      .trim()
  );
}
