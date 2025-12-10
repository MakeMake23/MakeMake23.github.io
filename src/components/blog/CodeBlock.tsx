"use client";

import ShikiHighlighter, { Language } from "react-shiki";

export default function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: Language;
}) {
  return (
    <ShikiHighlighter language={language} theme="github-dark" className="mb-4">
      {children}
    </ShikiHighlighter>
  );
}
