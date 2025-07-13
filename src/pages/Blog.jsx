import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTag, FaClock, FaSearch, FaSpinner } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // You can change this to other themes

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);

  // Fetch posts from Phoenix API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  // Filter posts based on search term and selected tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time (rough estimate)
  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Toggle expanded post
  const toggleExpanded = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BiCodeAlt className="text-6xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Error: {error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Make sure the Phoenix server is running at http://localhost:4000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <section className="mb-12 fade-in">
          <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">Blog</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-center">
            Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.
          </p>
        </section>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === '' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <BiCodeAlt className="text-6xl text-gray-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              {posts.length === 0 ? 'No posts yet' : 'No posts match your search'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {posts.length === 0 
                ? 'Check back soon for new content!' 
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Featured Image */}
                {post.featured_image && (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Post Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary dark:hover:text-primary-light transition-colors">
                      {post.title}
                    </h2>
                    
                    {/* Post Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(post.published_at || post.inserted_at)}</span>
                      </div>
                      
                      {post.content && (
                        <div className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          <span>{calculateReadingTime(post.content)} min read</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            <FaTag className="text-xs" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="max-w-none">
                    {post.excerpt && (
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {expandedPost === post.id && post.content && (
                      <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            // Override code blocks for better dark mode support
                            code: ({node, inline, className, children, ...props}) => {
                              return !inline ? (
                                <div className="relative mb-4">
                                  <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
                                    <code className={`${className} text-sm leading-relaxed`} {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                </div>
                              ) : (
                                <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700" {...props}>
                                  {children}
                                </code>
                              );
                            },
                            // Override pre blocks to work with code component
                            pre: ({node, ...props}) => (
                              <div {...props} />
                            ),
                            // Better blockquote styling
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-6 py-4 my-4 italic text-gray-700 dark:text-gray-300 rounded-r-lg" {...props} />
                            ),
                            // Better table styling
                            table: ({node, ...props}) => (
                              <div className="overflow-x-auto my-4">
                                <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700" {...props} />
                              </div>
                            ),
                            th: ({node, ...props}) => (
                              <th className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-left" {...props} />
                            ),
                            td: ({node, ...props}) => (
                              <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700" {...props} />
                            ),
                          }}
                        >
                          {post.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {/* Read More Button */}
                  {post.content && post.content.length > 200 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => toggleExpanded(post.id)}
                        className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium text-sm transition-colors"
                      >
                        {expandedPost === post.id ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Posts Counter */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog; 