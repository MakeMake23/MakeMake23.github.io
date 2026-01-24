"use client";

import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blog-posts";
import { Dictionary } from "@/dictionaries";
import { getNestedProperty } from "@/utils";

interface BlogPostCardProps {
  post: BlogPost;
  dict: Dictionary;
}

export default function BlogPostCard({ post, dict }: BlogPostCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-purple-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {getNestedProperty(dict, post.titleKey)}
          </h2>

          <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-2">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              {post.date}
            </span>
            <span className="flex items-center">
              <FaUser className="mr-2" />
              {post.author}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {getNestedProperty(dict, post.excerptKey)}
          </p>

          {post.image && (
            <div className="mb-4 relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={getNestedProperty(dict, post.titleKey)}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                unoptimized={
                  typeof post.image === "string"
                    ? post.image.endsWith(".gif")
                    : true
                }
              />
            </div>
          )}

          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
