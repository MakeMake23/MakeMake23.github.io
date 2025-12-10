import { ComponentType } from "react";
import { Locale } from "@/dictionaries";
import HelloWorldPost from "@/content/blog/000-hello-world";

export interface BlogPost {
  id: number;
  slug: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  author: string;
  tags?: string[];
  component: ComponentType<{ lang: Locale }>;
}

export const blogPosts: BlogPost[] = [
  {
    id: 0,
    slug: "hello-world",
    titleKey: "blog.posts.hello_world.title",
    excerptKey: "blog.posts.hello_world.excerpt",
    date: "2024-10-16",
    author: "Andy Ledesma García",
    tags: ["introduction", "welcome"],
    component: HelloWorldPost,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
