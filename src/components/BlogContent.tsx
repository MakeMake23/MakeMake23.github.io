"use client";

import { motion } from "framer-motion";
import AnimatedComponent from "./AnimatedComponent";
import { FaBlog, FaTools, FaCalendarAlt, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

interface BlogContentProps {
  dict: any;
}

export default function BlogContent({ dict }: BlogContentProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedComponent>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaBlog className="text-6xl text-purple-600" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-6 text-purple-800 dark:text-purple-300">
            {dict.blog.title}
          </h1>

          <div className="bg-purple-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaTools className="text-2xl text-purple-600 mr-2" />
              <h2 className="text-2xl font-semibold dark:text-white">
                {dict.blog.under_construction}
              </h2>
            </div>

            <p className="text-lg mb-6 dark:text-gray-300">
              {dict.blog.description}
            </p>

            <div className="text-center max-w-md mx-auto mb-8 py-4 px-6 bg-purple-50 dark:bg-gray-700 rounded-lg">
              <motion.div
                className="text-3xl mb-3"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✍️
              </motion.div>
              <p className="text-lg text-purple-700 dark:text-purple-300 font-medium">
                {dict.blog.coming_soon}
              </p>
            </div>

            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-6">
              <FaCalendarAlt className="mr-2" />
              <p>{dict.blog.expected_launch}</p>
            </div>

            <div className="border-t border-purple-200 dark:border-gray-700 my-6"></div>

            <div className="text-center">
              <p className="text-lg mb-4 dark:text-gray-300">{dict.blog.follow_on_linkedin}</p>
              <div className="flex justify-center items-center gap-4 mt-6">
                <motion.a
                  href="https://www.linkedin.com/in/andylg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/"
                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    {dict.blog.return_home}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedComponent>
    </div>
  );
}
