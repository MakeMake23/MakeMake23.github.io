"use client";

import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";
import { FaStar } from "react-icons/fa";
import NavLinkMotionDiv from "./NavLinkMotionDiv";
import NavLinkText from "./NavLinkText";

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang: Locale;
}

export default function ReviewNavLink({ onClick, lang }: Props) {
  const pathname = usePathname();
  const isReview = pathname.startsWith(`/${lang}/review`);
  const dict = getDictionary(lang);

  return (
    <Link href="/review/5" onClick={onClick}>
      <NavLinkMotionDiv
        bgClassName={
          isReview
            ? "bg-yellow-500 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-700"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }
      >
        <FaStar
          className={`text-lg ${isReview ? "text-white" : "text-yellow-500"}`}
        />
        <NavLinkText
          hasCustomBgColor={isReview}
          value={dict.navigation.reviews}
        />
      </NavLinkMotionDiv>
    </Link>
  );
}
