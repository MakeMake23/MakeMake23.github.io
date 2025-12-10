import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function EmphasisParagraph({ children }: Props) {
  return (
    <p className="text-xl font-medium mt-8 text-gray-800 dark:text-gray-200">
      {children}
    </p>
  );
}
