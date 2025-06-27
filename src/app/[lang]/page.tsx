import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "../../dictionaries";
import AnimatedComponent from "@/components/AnimatedComponent";
import Counter from '@/components/Counter';
import CVCard from '@/components/CVCard';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

// This function is called at build time to generate static paths
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

// In Next.js 14, we need to be careful with dynamic parameters
export default async function Page({ params }: { params: { lang: string } }) {
  // In Next.js 14, we need to await params before accessing its properties
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;

  // Validate the language parameter
  const lang = ["en", "es"].includes(langParam) ? langParam : "en";

  // Fetch the dictionary
  const dict = await getDictionary(lang as Locale);

  // Pre-compute the target language for the language switcher
  const targetLang = lang === "en" ? "es" : "en";
  const targetPath = `/${targetLang}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="absolute top-4 right-4">
          <Link
            href={targetPath}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{lang === "en" ? "🇪🇸" : "🇬🇧"}</span>
            {lang === "en" ? "Español" : "English"}
          </Link>
        </div>

        <AnimatedComponent>
          <section className="mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={5} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{dict.stats.experience}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={22} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{dict.stats.projects}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={7} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{dict.stats.organizations}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={600000} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{dict.stats.loc}</p>
              </div>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {dict.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {dict.subtitle}
            </p>
          </header>
        </AnimatedComponent>

        <AnimatedComponent>
          <section className="mb-12">
            <div className="flex justify-center">
              {lang === 'en' ? (
                <CVCard
                  href="/cv"
                  title={dict.resume.english.title}
                  action={dict.resume.english.action}
                />
              ) : (
                <CVCard
                  href="/es/cv"
                  title={dict.resume.spanish.title}
                  action={dict.resume.spanish.action}
                />
              )}
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
              {dict.sections.contact}
            </h2>
            <div className="flex justify-center items-center gap-8 text-4xl">
              <a
                href="mailto:hi@andylg.me"
                aria-label={dict.contact.email}
                title={dict.contact.email}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://t.me/andy_ledesma_garcia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.contact.telegram}
                title={dict.contact.telegram}
                className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=971582472016"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.contact.whatsapp}
                title={dict.contact.whatsapp}
                className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://github.com/MakeMake23"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.profiles.github}
                title={dict.profiles.github}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/andylg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.profiles.linkedin}
                title={dict.profiles.linkedin}
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Andy Ledesma García.{" "}
              {dict.footer.rights}
            </p>
          </footer>
        </AnimatedComponent>
      </div>
    </div>
  );
}
