"use client";

import AnimatedComponent from "../AnimatedComponent";
import { FaBlog } from "react-icons/fa";
import { Dictionary } from "@/dictionaries";
import { blogPosts } from "@/data/blog-posts";
import BlogPostCard from "./BlogPostCard";

interface BlogContentProps {
  dict: Dictionary;
}

export default function BlogHome({ dict }: BlogContentProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedComponent>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-purple-800 dark:text-purple-300 text-center flex items-baseline-last justify-center">
            <FaBlog />
            <span>log</span>
          </h1>

          <p className="text-lg mb-12 text-center dark:text-gray-300 max-w-2xl mx-auto">
            {dict.blog.description}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} dict={dict} />
            ))}
          </div>
        </div>
      </AnimatedComponent>
    </div>
  );
}
