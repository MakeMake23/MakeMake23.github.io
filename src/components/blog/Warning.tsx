import { getDictionary, Locale } from "@/dictionaries";
import { FaTriangleExclamation } from "react-icons/fa6";

interface WarningProps {
  title?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  locale: Locale;
}

export default function Warning({
  title,
  children,
  collapsible = false,
  locale,
}: WarningProps) {
  const dict = getDictionary(locale).components.warning;
  const titleText = title || dict.title;
  const expandText = dict.click_to_expand;

  const icon = (
    <FaTriangleExclamation
      className="h-4 w-4 flex-none text-amber-600 dark:text-amber-500"
      aria-hidden="true"
    />
  );
  const titleSpan = <span className="font-semibold text-sm">{titleText}</span>;
  const header = (
    <>
      {icon}
      {titleSpan}
    </>
  );
  const childrenContainer = (
    <div className="pl-6.5 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  );

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50/50 border-l-4 border-l-amber-500 p-4 text-gray-800 dark:bg-amber-950/20 dark:border-amber-800 dark:border-l-amber-500 dark:text-gray-200 my-3">
      {collapsible ? (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2.5 hover:opacity-80 transition-opacity">
            {header}
            <span className="text-xs text-gray-500 dark:text-gray-400 group-open:hidden ml-1">
              {expandText}
            </span>
            <span
              className="ml-auto transition-transform group-open:rotate-180 text-gray-500"
              aria-hidden="true"
            >
              ▾
            </span>
          </summary>

          {childrenContainer}
        </details>
      ) : (
        <>
          <div className="flex items-center gap-2.5 mb-2">{header}</div>
          {childrenContainer}
        </>
      )}
    </div>
  );
}
