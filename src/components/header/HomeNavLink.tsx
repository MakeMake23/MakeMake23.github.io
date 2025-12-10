"use client";

import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";
import { FaHome } from "react-icons/fa";
import NavLinkText from "./NavLinkText";
import NavLinkMotionDiv from "./NavLinkMotionDiv";

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang: Locale;
}

export default function HomeNavLink({ onClick, lang }: Props) {
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const isHome = pathname === "/" || pathname === `/${lang}`;

  return (
    <Link href="/" onClick={onClick}>
      <NavLinkMotionDiv
        bgClassName={
          isHome
            ? "bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }
      >
        <FaHome
          className={`text-lg ${isHome ? "text-white" : "text-blue-500"}`}
        />
        <NavLinkText hasCustomBgColor={isHome} value={dict.navigation.home} />
      </NavLinkMotionDiv>
    </Link>
  );
}
