'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../i18n-config';

export default function LanguageSwitcher({ label }: { label: string }) {
  const pathName = usePathname();
  
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    
    const segments = pathName.split('/');
    segments[1] = locale;
    
    return segments.join('/');
  };

  // Toggle between English and Spanish
  const currentLocale = pathName.split('/')[1];
  const targetLocale = currentLocale === 'en' ? 'es' : 'en';

  return (
    <div className="absolute top-4 right-4">
      <Link
        href={redirectedPathName(targetLocale)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {label}
      </Link>
    </div>
  );
}
