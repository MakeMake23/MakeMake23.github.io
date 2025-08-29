import Image from "next/image";
import { getDictionary, Locale } from "../../dictionaries";
import AnimatedComponent from "@/components/AnimatedComponent";
import AnimatedRoles from "@/components/AnimatedRoles";
import Counter from "@/components/Counter";
import CVCard from "@/components/CVCard";
import Blockchain from "@/components/Blockchain";
import TeamsSection from "@/components/TeamsSection";
import ReviewSection from "@/components/ReviewSection";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

const IS_AVAILABLE_FOR_WORK =
  process.env.NEXT_PUBLIC_IS_AVAILABLE_FOR_WORK === "true";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;
  const lang = ["en", "es"].includes(langParam) ? langParam : "en";
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedComponent>
          <section className="mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={5} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {dict.stats.experience}
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={22} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {dict.stats.projects}
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={7} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {dict.stats.organizations}
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  <Counter from={0} to={600000} prefix="+" />
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {dict.stats.loc}
                </p>
              </div>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
          <header className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative overflow-hidden rounded-full">
                <Image
                  src="/profile.png"
                  alt="Andy Ledesma García"
                  width={200}
                  height={200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {dict.title}
            </h1>
            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
              {"“"}
              {dict.quote.split("\n").map((line, idx, arr) => (
                <span key={idx}>
                  {line}
                  {idx < arr.length - 1 && <br />}
                </span>
              ))}
              {"”"}
            </p>
            <AnimatedRoles roles={dict.subtitle.split(" • ")} />
          </header>
        </AnimatedComponent>

        <AnimatedComponent>
          <section className="mb-12">
            <div className="max-w-3xl mx-auto mb-8 px-4 text-center">
              {IS_AVAILABLE_FOR_WORK && (
                <a
                  href="#links"
                  className="block cursor-pointer transition-transform hover:scale-105"
                >
                  <div className="animate-pulse flex flex-col justify-center items-center bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-3 px-6 rounded-full shadow-lg mb-4">
                    <div className="flex items-center mb-1">
                      <div className="mr-2 h-3 w-3 bg-white rounded-full animate-ping"></div>
                      <span className="text-lg">
                        {dict.resume.availability}
                      </span>
                    </div>
                    <span className="text-xs opacity-80">
                      {dict.resume.contact_cta}
                    </span>
                  </div>
                </a>
              )}
            </div>
            <div className="flex justify-center">
              <CVCard
                href="/cv"
                title={dict.resume.title}
                action={dict.resume.action}
              />
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
          <TeamsSection title={dict.sections.teams} dict={dict.teams} />
        </AnimatedComponent>

        <Blockchain dict={dict.blockchain} />

        <AnimatedComponent>
          <section id="links" className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl -z-10 transform -rotate-1"></div>
            <div className="absolute inset-0 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl -z-10 transform rotate-1"></div>
            <div className="py-8 px-4">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-400 dark:to-teal-400 mb-6 text-center flex items-center justify-center gap-2 animate-pulse-slow">
                ✨ {dict.sections.contact} ✨
              </h2>
              <div className="flex justify-center items-center gap-8 text-4xl">
                <a
                  href="mailto:hi@andylg.me"
                  aria-label={dict.contact.email}
                  title={dict.contact.email}
                  className="transform hover:scale-125 hover:rotate-6 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://t.me/andy_ledesma_garcia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.contact.telegram}
                  title={dict.contact.telegram}
                  className="transform hover:scale-125 hover:-rotate-6 text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-all duration-300"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=971582472016"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.contact.whatsapp}
                  title={dict.contact.whatsapp}
                  className="transform hover:scale-125 hover:rotate-6 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-all duration-300"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://github.com/MakeMake23"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.profiles.github}
                  title={dict.profiles.github}
                  className="transform hover:scale-125 hover:-rotate-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/andylg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.profiles.linkedin}
                  title={dict.profiles.linkedin}
                  className="transform hover:scale-125 hover:rotate-6 text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-all duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>

              <p className="mt-6 text-center text-gray-600 dark:text-gray-300 italic">
                <span className="inline-block animate-bounce mr-1">👋</span>
                {dict.contact.message}
              </p>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent>
          <ReviewSection
            reviewTitle={dict.sections.review_title}
            buttonText={dict.sections.review_button}
          />
        </AnimatedComponent>
      </div>
    </div>
  );
}
