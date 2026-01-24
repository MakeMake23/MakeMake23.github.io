import { ComponentType } from "react";
import { Locale } from "@/dictionaries";
import HelloWorldPost from "@/content/blog/000-hello-world";
import meWaving from "@/assets/images/me-waving.gif";
import NoMoreScamsPost from "@/content/blog/001-no-more-scams";
import meVsScammer from "@/assets/images/me-vs-scammer.gif";

export interface BlogPost {
  id: number;
  slug: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  author: string;
  image?: any;
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
    image: meWaving,
    tags: ["introduction", "welcome"],
    component: HelloWorldPost,
  },
  {
    id: 1,
    slug: "no-more-scams",
    titleKey: "blog.posts.no_more_scams.title",
    excerptKey: "blog.posts.no_more_scams.excerpt",
    date: "2025-01-06",
    author: "Andy Ledesma García",
    image: meVsScammer,
    tags: ["job-hunting", "security", "privacy", "scams", "tips"],
    component: NoMoreScamsPost,
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
