"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedComponentProps {
  children: ReactNode;
}

const AnimatedComponent = ({ children }: AnimatedComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
