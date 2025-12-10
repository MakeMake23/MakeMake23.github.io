"use client";

import { motion } from "framer-motion";
import AnimatedComponent from "../AnimatedComponent";
import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTags } from "react-icons/fa";
import { ReactNode } from "react";

interface BlogPostContentProps {
  postMeta: {
    id: number;
    slug: string;
    title: string;
    date: string;
    author: string;
    tags?: string[];
  };
  blogContent: ReactNode;
  lang: Locale;
}

export default function BlogPostContent({
  postMeta,
  blogContent,
  lang,
}: BlogPostContentProps) {
  const dict = getDictionary(lang);
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedComponent>
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {dict.blog.posts.back_to_blog_home}
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
          >
            <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                {postMeta.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <time dateTime={postMeta.date}>
                    {new Date(postMeta.date).toLocaleDateString(
                      lang === "es" ? "es-ES" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                </div>

                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{postMeta.author}</span>
                </div>

                {postMeta.tags && postMeta.tags.length > 0 && (
                  <div className="flex items-center">
                    <FaTags className="mr-2" />
                    <div className="flex gap-2">
                      {postMeta.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {blogContent}
          </motion.article>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Link
              href={`/${lang}/blog`}
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              View All Posts
            </Link>
          </motion.div>
        </div>
      </AnimatedComponent>
    </div>
  );
}
