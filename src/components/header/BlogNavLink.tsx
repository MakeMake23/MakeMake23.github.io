"use client";

import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";
import { FaBlog } from "react-icons/fa";
import NavLinkText from "./NavLinkText";
import NavLinkMotionDiv from "./NavLinkMotionDiv";

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang: Locale;
}

export default function BlogNavLink({ onClick, lang }: Props) {
  const pathname = usePathname();
  const isBlog = pathname.startsWith(`/${lang}/blog`);
  const dict = getDictionary(lang);

  return (
    <Link href="/blog" onClick={onClick}>
      <NavLinkMotionDiv
        bgClassName={
          isBlog
            ? "bg-purple-500 dark:bg-purple-600 border-purple-600 dark:border-purple-700"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }
      >
        <FaBlog
          className={`text-lg ${isBlog ? "text-white" : "text-purple-500"}`}
        />
        <NavLinkText hasCustomBgColor={isBlog} value={dict.navigation.blog} />
      </NavLinkMotionDiv>
    </Link>
  );
}
