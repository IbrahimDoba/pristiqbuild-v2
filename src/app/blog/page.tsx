import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import SafeImage from '@/components/SafeImage';

export const metadata: Metadata = {
  title: 'Blog - Light Gauge Steel Construction Insights | PristiqBuild',
  description:
    'Expert insights, guides, and articles on light gauge steel construction in Nigeria. Learn about LGS technology, costs, applications, and best practices.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Group posts by category
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Light Gauge Steel Construction Insights
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Expert knowledge on light gauge steel technology, applications, and best practices for
              Nigerian construction projects.
            </p>
            <div className="mt-8 flex items-center gap-4 text-primary-100">
              <span className="font-semibold">{posts.length} Articles</span>
              <span>•</span>
              <span>{categories.length} Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
          <div className="h-1 w-20 bg-primary-600"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-[box-shadow,transform] duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <SafeImage
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-colors">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts by Category */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <div className="h-1 w-20 bg-primary-600"></div>
          </div>

          {categories.map((category) => {
            const categoryPosts = posts.filter((post) => post.category === category);

            return (
              <div key={category} className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  {category}
                  <span className="text-sm font-normal text-gray-500">
                    ({categoryPosts.length})
                  </span>
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-lg p-6 shadow hover:shadow-lg transition-[color,background-color,border-color,box-shadow] hover:border-primary-500 border border-transparent"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <SafeImage
                            src={post.coverImage}
                            alt={post.coverImageAlt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your LGS Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get expert guidance and accurate cost estimates for your light gauge steel construction
            project in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cost-calculator"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-[color,background-color,border-color,transform] hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Calculate Project Cost
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
