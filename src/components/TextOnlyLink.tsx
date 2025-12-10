import Link from "next/link";

interface Props {
  href: string;
  isInNewTab?: boolean;
  text: string;
}

export default function TextOnlyLink({
  href,
  isInNewTab = false,
  text,
}: Props) {
  return (
    <Link
      href={href}
      target={isInNewTab ? "_blank" : undefined}
      className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300/50 hover:decoration-blue-500 transition-all"
    >
      {text}
    </Link>
  );
}
