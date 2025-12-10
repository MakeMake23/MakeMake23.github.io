import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Paragraph({ children }: Props) {
  return (
    <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
      {children}
    </p>
  );
}
