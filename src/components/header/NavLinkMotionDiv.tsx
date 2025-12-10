"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bgClassName: string;
}

export default function NavLinkMotionDiv({ children, bgClassName }: Props) {
  return (
    <motion.div
      className={`flex items-center gap-2 border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 px-4 py-2 transform hover:-translate-y-1 ${bgClassName}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
