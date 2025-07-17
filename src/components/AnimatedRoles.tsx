"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedRolesProps {
  roles: string[];
}

const AnimatedRoles: React.FC<AnimatedRolesProps> = ({ roles }) => {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);

  const getRandomRoleIndex = useCallback(
    ()=> Math.floor(Math.random() * roles.length),
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
  }, [activeRoleIndex, roles.length]);

  return (
    <p className="text-xl text-gray-600 dark:text-gray-300">
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
            className={`inline-block ${activeRoleIndex === index ? 'font-bold text-gray-800 dark:text-gray-100' : ''}`}
          >
            {role}
          </motion.span>
          {index < roles.length - 1 && (
            <motion.span
              animate={{
                opacity: activeRoleIndex === index || activeRoleIndex === index + 1 ? 0 : 1,
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
