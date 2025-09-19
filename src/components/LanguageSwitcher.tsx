"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Locale } from "../dictionaries";
import en from "../dictionaries/en.json";
import es from "../dictionaries/es.json";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const targetLocale = currentLocale === "en" ? "es" : "en";
  const label = targetLocale === "en" ? es.language.switch : en.language.switch;

  const pathSegments = pathname.split('/');
  pathSegments[1] = targetLocale;
  const basePath = pathSegments.join('/');
  const search = searchParams.toString();
  const href = search ? `${basePath}?${search}` : basePath;

  return (
    <div>
      <a
        href={href}
        onClick={e => {
          e.preventDefault();
          document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
          const hash = typeof window !== 'undefined' ? window.location.hash : '';
          const finalHref = `${href}${hash}`;
          router.push(finalHref);
        }}
        className="px-4 py-2 text-base bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 min-w-[90px]"
      >
        {label}
      </a>
    </div>
  );
}
 