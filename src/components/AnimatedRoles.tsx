"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

interface AnimatedRolesProps {
  roles: string[];
}

const AnimatedRoles: React.FC<AnimatedRolesProps> = ({ roles }) => {
  const isMobile = useIsMobile();
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const getRandomRoleIndex = useCallback(
    () => Math.floor(Math.random() * roles.length),
    [roles.length]
  );

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setActiveRoleIndex(getRandomRoleIndex());
    }, 1000);

    const changingRoleInterval = setInterval(() => {
      let newDifferentIndex;
      do {
        newDifferentIndex = getRandomRoleIndex();
      } while (newDifferentIndex === activeRoleIndex && roles.length > 1);

      setActiveRoleIndex(newDifferentIndex);
    }, 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(changingRoleInterval);
    };
  }, [activeRoleIndex, roles.length, isMobile, getRandomRoleIndex]);

  useEffect(() => {
    if (isMobile && marqueeRef.current) {
      // The content is duplicated for a seamless loop, so we measure half the scrollWidth.
      const oneSetWidth = marqueeRef.current.scrollWidth / 2;
      setContentWidth(oneSetWidth);
    }
  }, [isMobile, roles]);

  if (isMobile) {
    const marqueeVariants = {
      animate: {
        x: [0, -contentWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop" as const,
            duration: contentWidth / 50,
            ease: "linear" as const,
          },
        },
      },
    };

    const duplicatedRoles = [...roles, ...roles];

    return (
      <div className="w-full overflow-x-hidden">
        <motion.div
          ref={marqueeRef}
          className="flex whitespace-nowrap items-center"
          variants={marqueeVariants}
          animate={contentWidth > 0 ? "animate" : ""}
        >
          {duplicatedRoles.map((role, index) => {
            const originalIndex = index % roles.length;
            const isRoleActive = activeRoleIndex === originalIndex;

            return (
              <React.Fragment key={index}>
                <motion.span
                  animate={{
                    scale: isRoleActive ? 1.1 : 1,
                    y: isRoleActive ? -2 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 10,
                  }}
                  className={`inline-block mx-2 text-xl text-gray-600 dark:text-gray-300 ${
                    isRoleActive
                      ? "font-bold text-gray-800 dark:text-gray-100"
                      : ""
                  }`}
                >
                  {role}
                </motion.span>
                {index < duplicatedRoles.length - 1 && (
                  <motion.span
                    className="mx-2 text-xl text-gray-600 dark:text-gray-300"
                    animate={{
                      opacity:
                        activeRoleIndex === originalIndex ||
                        activeRoleIndex === (originalIndex + 1) % roles.length
                          ? 0
                          : 1,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    {"•"}
                  </motion.span>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    );
  }

  return (
    <p className="text-xl text-center text-gray-600 dark:text-gray-300">
      {roles.map((role, index) => (
        <React.Fragment key={index}>
          <motion.span
            animate={{
              scale: activeRoleIndex === index ? 1.1 : 1,
              y: activeRoleIndex === index ? -5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 10,
            }}
            className={`inline-block ${
              activeRoleIndex === index
                ? "font-bold text-gray-800 dark:text-gray-100"
                : ""
            }`}
          >
            {role}
          </motion.span>
          {index < roles.length - 1 && (
            <motion.span
              animate={{
                opacity:
                  activeRoleIndex === index || activeRoleIndex === index + 1
                    ? 0
                    : 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {" • "}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};

export default AnimatedRoles;
