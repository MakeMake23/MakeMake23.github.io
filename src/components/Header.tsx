"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, getDictionary } from "@/dictionaries";
import Image from "next/image";
import Link from "next/link";
import favicon from "@/assets/images/favicon-180x180.png";
import BrandName from './BrandName';
import { useEffect, useState } from "react";
import { FaFileAlt, FaHandPeace, FaStar, FaBlog, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

interface HeaderProps {
  currentLocale: Locale;
}

const Header = ({ currentLocale }: HeaderProps) => {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(currentLocale);
      setDict(dictionary);
    };
    loadDictionary();
  }, [currentLocale]);

  return (
    <header className="flex items-center p-4 w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={favicon}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <BrandName />
      </Link>
      
      <nav className="flex-1 flex justify-center items-center space-x-8 mx-4">
        {dict && (
          <>
            <Link href="/">
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaHome className="text-lg text-blue-500" />
                </motion.div>
                <span className="font-medium text-gray-900 dark:text-white">{dict.navigation.home}</span>
              </motion.div>
            </Link>
            <Link href="/cv" target="_blank" rel="noopener noreferrer">
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaFileAlt className="text-lg text-red-500" />
                </motion.div>
                <span className="font-medium text-gray-900 dark:text-white">{dict.navigation.cv}</span>
              </motion.div>
            </Link>
            
            <Link href="/#links">
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaHandPeace className="text-lg text-green-500" />
                </motion.div>
                <span className="font-medium text-gray-900 dark:text-white">{dict.navigation.say_hi}</span>
              </motion.div>
            </Link>
            
            <Link href="/review/5">
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, 0, 180, 180, 0] }}
                  transition={{ duration: 0.7 }}
                >
                  <FaStar className="text-lg text-yellow-500" />
                </motion.div>
                <span className="font-medium text-gray-900 dark:text-white">{dict.navigation.reviews}</span>
              </motion.div>
            </Link>
            
            <Link href="/blog">
              <motion.div 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
                >
                  <FaBlog className="text-lg text-purple-500" />
                </motion.div>
                <span className="font-medium text-gray-900 dark:text-white">{dict.navigation.blog}</span>
              </motion.div>
            </Link>
          </>
        )}
      </nav>
      
      <LanguageSwitcher currentLocale={currentLocale} />
    </header>
  );
};

export default Header;
