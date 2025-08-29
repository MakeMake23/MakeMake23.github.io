import { Locale, getDictionary } from "@/dictionaries";
import BlogContent from "@/components/BlogContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;
  const lang = ["en", "es"].includes(langParam) ? langParam : "en";
  const dict = await getDictionary(lang as Locale);
  return {
    title: `Blog | ${dict.title}`,
    description: `Blog posts by ${dict.title}`,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as string;
  const dict = await getDictionary(lang as Locale);

  return <BlogContent dict={dict} />;
}
