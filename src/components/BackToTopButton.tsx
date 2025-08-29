"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import AnimatedComponent from "./AnimatedComponent";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isVisible && (
        <AnimatedComponent>
          <button
            onClick={scrollToTop}
            className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Go to top"
          >
            <FaArrowUp />
          </button>
        </AnimatedComponent>
      )}
    </div>
  );
};

export default BackToTopButton;
