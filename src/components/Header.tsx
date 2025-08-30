"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, getDictionary } from "@/dictionaries";
import Link from "next/link";
import BrandName from "./BrandName";
import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaHandPeace,
  FaStar,
  FaBlog,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface HeaderProps {
  currentLocale: Locale;
}

const Header = ({ currentLocale }: HeaderProps) => {
  const [dict, setDict] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(currentLocale);
      setDict(dictionary);
    };
    loadDictionary();
  }, [currentLocale]);

  const navLinks = dict && (
    <>
      <Link href="/" onClick={() => setIsMenuOpen(false)}>
        <motion.div
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaHome className="text-lg text-blue-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {dict.navigation.home}
          </span>
        </motion.div>
      </Link>
      <Link
        href="/cv"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsMenuOpen(false)}
      >
        <motion.div
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaFileAlt className="text-lg text-red-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {dict.navigation.cv}
          </span>
        </motion.div>
      </Link>
      <Link href="/#links" onClick={() => setIsMenuOpen(false)}>
        <motion.div
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaHandPeace className="text-lg text-green-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {dict.navigation.say_hi}
          </span>
        </motion.div>
      </Link>
      <Link href="/review/5" onClick={() => setIsMenuOpen(false)}>
        <motion.div
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaStar className="text-lg text-yellow-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {dict.navigation.reviews}
          </span>
        </motion.div>
      </Link>
      <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
        <motion.div
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaBlog className="text-lg text-purple-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {dict.navigation.blog}
          </span>
        </motion.div>
      </Link>
    </>
  );

  return (
    <header className="relative flex items-center justify-between p-4 w-full">
      <Link href="/" className="z-30">
        <BrandName />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8 mx-4">
        {navLinks}
      </nav>

      <div className="hidden lg:block z-30">
        <LanguageSwitcher currentLocale={currentLocale} />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-30">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-gray-800 dark:text-white"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center lg:hidden z-20"
        >
          <nav className="flex flex-col items-center space-y-8">{navLinks}</nav>
          <div className="mt-8">
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
