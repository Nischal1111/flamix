"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  User,
  Tag,
  Sparkles,
  BookOpen,
  TrendingUp,
  Calendar
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cloud Computing: Trends to Watch in 2026",
    excerpt: "Explore the emerging trends shaping cloud infrastructure, from edge computing to serverless architectures and beyond.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    category: "Cloud",
    author: "Alex Chen",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    readTime: "8 min read",
    date: "Jan 28, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable APIs with GraphQL and Node.js",
    excerpt: "A comprehensive guide to designing and implementing production-ready GraphQL APIs.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    category: "Development",
    author: "Sarah Kim",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    readTime: "12 min read",
    date: "Jan 25, 2026",
    featured: false,
  },
  {
    id: 3,
    title: "AI-Powered DevOps: Automating Your Pipeline",
    excerpt: "How machine learning is revolutionizing continuous integration and deployment workflows.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    category: "AI & ML",
    author: "Mike Johnson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    readTime: "6 min read",
    date: "Jan 22, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "Securing Your Microservices Architecture",
    excerpt: "Best practices for implementing zero-trust security in distributed systems.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    category: "Security",
    author: "Lisa Park",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    readTime: "10 min read",
    date: "Jan 18, 2026",
    featured: false,
  },
];

const categories = ["All", "Cloud", "Development", "AI & ML", "Security", "DevOps"];

// Featured blog card
function FeaturedBlogCard({ post }: { post: typeof blogPosts[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <Link href="#" className="block">
        <div className="grid md:grid-cols-2 gap-8 bg-background rounded-3xl overflow-hidden border border-foreground/5 hover:border-primary/20 transition-colors">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-foreground/50 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-foreground/60 mb-6 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{post.author}</p>
                  <p className="text-xs text-foreground/50">{post.date}</p>
                </div>
              </div>

              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                className="flex items-center gap-2 text-primary font-medium"
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Regular blog card
function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href="#" className="block h-full">
        <div className="h-full bg-background rounded-2xl overflow-hidden border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Category */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                <Tag className="w-3 h-3 text-primary" />
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-foreground/50 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Author & Read more */}
            <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{post.author}</span>
              </div>

              <motion.span
                animate={{ x: isHovered ? 3 : 0 }}
                className="text-primary"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Category filter
function CategoryFilter({
  selected,
  onChange
}: {
  selected: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === category
              ? "bg-primary text-white"
              : "bg-muted hover:bg-primary/10 text-foreground/70 hover:text-primary"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}

export function Blog() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts =
    selectedCategory === "All"
      ? regularPosts
      : regularPosts.filter((post) => post.category === selectedCategory);

  return (
    <section
      ref={containerRef}
      id="blog"
      className="relative py-24 md:py-32 overflow-hidden bg-muted/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-primary font-medium mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Latest Insights
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
            From Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Blog
            </span>
          </h2>

          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices
            in technology and software development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <div className="mb-12">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="#">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/20 rounded-xl font-semibold hover:bg-primary/5 transition-colors"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative px-8 py-12 md:px-16 md:py-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Newsletter
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Ahead of the Curve
              </h3>
              <p className="text-foreground/60 max-w-md mx-auto mb-8">
                Get weekly insights on technology trends, best practices, and
                exclusive content delivered to your inbox.
              </p>

              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 bg-background border border-primary/10 rounded-xl focus:outline-none focus:border-primary/30 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </form>

              <p className="text-xs text-foreground/40 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
