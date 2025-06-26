import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "../../dictionaries";

// This function is called at build time to generate static paths
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' }
  ];
}

// In Next.js 14, we need to be careful with dynamic parameters
export default async function Page({ params }: { params: { lang: string } }) {
  // In Next.js 14, we need to await params before accessing its properties
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;
  
  // Validate the language parameter
  const lang = ['en', 'es'].includes(langParam) ? langParam : 'en';
  
  // Fetch the dictionary
  const dict = await getDictionary(lang as Locale);
  
  // Pre-compute the target language for the language switcher
  const targetLang = lang === 'en' ? 'es' : 'en';
  const targetPath = `/${targetLang}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="absolute top-4 right-4">
          <Link
            href={targetPath}
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {lang === 'en' ? 'Español' : 'English'}
          </Link>
        </div>
        
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/profile.jpeg"
                alt="Andy Ledesma García"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{dict.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{dict.subtitle}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{dict.sections.resume}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/CV_Andy_Ledesma_Garcia_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              {dict.resume.english}
            </Link>
            <Link
              href="/CV_Andy_Ledesma_Garcia_ES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-center"
            >
              {dict.resume.spanish}
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{dict.sections.contact}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:andyledesmagarcia@gmail.com"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 dark:text-gray-200">{dict.contact.email}</span>
            </a>
            <a
              href="https://t.me/MakeMake23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 dark:text-gray-200">{dict.contact.telegram}</span>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{dict.sections.profiles}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com/MakeMake23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 dark:text-gray-200">{dict.profiles.github}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/andy-ledesma-garcia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 dark:text-gray-200">{dict.profiles.linkedin}</span>
            </a>
          </div>
        </section>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Andy Ledesma García. {dict.footer.rights}</p>
        </footer>
      </div>
    </div>
  );
}
