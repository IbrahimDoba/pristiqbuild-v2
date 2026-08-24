import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/mdx';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import ShareButton from '@/components/ShareButton';
import MdxContent from '@/components/MdxContent';
import AuthorBio from '@/components/AuthorBio';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | PristiqBuild`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Back Buttons */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900">
        <SafeImage
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <span className="font-medium text-gray-900">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary-600" />
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary-600" />
              <span>{post.readTime}</span>
            </div>
            <div className="ml-auto">
              <ShareButton
                title={post.title}
                description={post.description}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description / Lead */}
        <div className="mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 rounded-r-xl">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
            {post.description}
          </p>
        </div>

        {/* MDX Content */}
        <div className="mdx-article">
          <MdxContent source={post.content} />
        </div>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary-600" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-full text-sm font-medium transition-colors cursor-pointer border border-transparent hover:border-primary-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <AuthorBio author={post.author} />

        {/* CTA */}
        <div className="mt-12 p-8 md:p-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your LGS Project?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get expert guidance and quality materials for your light gauge steel
            construction project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cost-calculator"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-lg"
            >
              Calculate Your Project Cost
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Continue Reading
          </h2>
          <div className="space-y-4">
            <Link
              href="/blog"
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-[color,background-color,border-color,box-shadow] group"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                Explore All Articles
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </h3>
              <p className="text-gray-600 mt-2">
                Discover more insights on light gauge steel construction in
                Nigeria
              </p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
