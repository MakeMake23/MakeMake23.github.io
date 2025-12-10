import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PostContainer({ children }: Props) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {children}
    </div>
  );
}
