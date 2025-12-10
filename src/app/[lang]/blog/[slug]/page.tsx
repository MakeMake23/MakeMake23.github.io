import { Locale, getDictionary } from "@/dictionaries";
import { getBlogPostBySlug, getBlogPostById } from "@/data/blog-posts";
import { notFound, redirect } from "next/navigation";
import BlogPostContent from "@/components/blog/BlogPostContent";

// Helper function to get nested property from object using dot notation
function getNestedProperty(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;
  const lang = ["en", "es"].includes(langParam) ? langParam : "en";
  const dict = getDictionary(lang as Locale);

  const slug = resolvedParams.slug;
  const post = getBlogPostBySlug(slug) || getBlogPostById(parseInt(slug, 10));

  if (!post) {
    return {
      title: `Blog | ${dict.title}`,
      description: "Blog post not found",
    };
  }

  return {
    title: `${getNestedProperty(dict, post.titleKey)} | ${dict.title}`,
    description: getNestedProperty(dict, post.excerptKey),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang);

  let post = getBlogPostBySlug(slug);

  if (!post) {
    const id = parseInt(slug, 10);
    if (!isNaN(id)) {
      post = getBlogPostById(id);

      if (post) redirect(`/${lang}/blog/${post.slug}`);
    }
  }

  if (!post) {
    notFound();
  }

  const BlogContentComponent = post.component;
  const blogContent = <BlogContentComponent lang={lang} />;

  return (
    <BlogPostContent
      postMeta={{
        id: post.id,
        slug: post.slug,
        title: getNestedProperty(dict, post.titleKey),
        date: post.date,
        author: post.author,
        tags: post.tags,
      }}
      blogContent={blogContent}
      lang={lang}
    />
  );
}
