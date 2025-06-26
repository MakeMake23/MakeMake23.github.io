import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              {/* Profile image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 text-4xl font-bold">
                ALG
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Andy Ledesma García
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
            CTO & Computer Scientist & Blockchain Developer & Back-end Developer
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Résumé (CV)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/andy-ledesma-garcia-cv.pdf" 
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
              >
                <div className="text-center">
                  <div className="text-blue-500 text-2xl mb-2">🇺🇸</div>
                  <div className="font-medium text-gray-900 dark:text-white">English</div>
                </div>
              </Link>
              <Link 
                href="/andy-ledesma-garcia-cv-es.pdf" 
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
              >
                <div className="text-center">
                  <div className="text-blue-500 text-2xl mb-2">🇪🇸</div>
                  <div className="font-medium text-gray-900 dark:text-white">Español</div>
                </div>
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Contact Me</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a 
                href="https://api.whatsapp.com/send?phone=971582472016" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-green-500 text-2xl mb-2">💬</div>
                <div className="font-medium text-gray-900 dark:text-white">WhatsApp</div>
              </a>
              <a 
                href="https://t.me/andy_ledesma_garcia" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-blue-500 text-2xl mb-2">✈️</div>
                <div className="font-medium text-gray-900 dark:text-white">Telegram</div>
              </a>
              <a 
                href="mailto:andy.ledesma.garcia@gmail.com" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-red-500 text-2xl mb-2">✉️</div>
                <div className="font-medium text-gray-900 dark:text-white">Email</div>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Professional Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://www.linkedin.com/in/andylg" 
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-blue-700 text-2xl mr-4">🔗</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Professional Network</div>
                </div>
              </a>
              <a 
                href="https://github.com/MakeMake23" 
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-gray-900 dark:text-white text-2xl mr-4">🐙</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Code Repository</div>
                </div>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Blockchain Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/blockchain/airdrops/index.html" 
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-purple-500 text-2xl mr-4">🪂</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Airdrops</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Blockchain Airdrops Information</div>
                </div>
              </Link>
              <Link 
                href="/blockchain/lightning-net/index.html" 
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-yellow-500 text-2xl mr-4">⚡</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Lightning Network</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Bitcoin Lightning Network</div>
                </div>
              </Link>
              <Link 
                href="/blockchain/thesis/1st-approach/index.html" 
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 col-span-full sm:col-span-2"
              >
                <div className="text-blue-500 text-2xl mr-4">📝</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Thesis</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Blockchain Research</div>
                </div>
              </Link>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Andy Ledesma García. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
