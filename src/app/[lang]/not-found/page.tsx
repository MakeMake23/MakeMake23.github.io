import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import me404 from "@/assets/images/me-404.png";

export default async function NotFoundPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ from: string }>;
}) {
  const { lang } = await params;
  const { from } = await searchParams;
  const fromUrl = decodeURIComponent(from);
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {dict.not_found.title}{" "}
          <span className="inline-block animate-bounce">🧭</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {dict.not_found.text_before_url}
        </p>
        <div className="mb-8">
          <code className="inline-block px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 break-all">
            {fromUrl}
          </code>
        </div>
        <div className="flex justify-center mb-8">
          <Image
            src={me404}
            alt={dict.not_found.title}
            width={220}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {dict.not_found.text_after_url}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-full shadow-md transition-transform hover:scale-105"
          >
            {dict.review_page.go_back_home} 🏠
          </Link>
          <Link
            href="/#links"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium px-5 py-3 rounded-full shadow-sm hover:shadow-lg transition-transform hover:scale-105"
          >
            {dict.not_found.report_issue}
          </Link>
        </div>
      </div>
    </div>
  );
}
