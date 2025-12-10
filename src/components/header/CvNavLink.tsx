"use client";

import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { FaFileAlt } from "react-icons/fa";
import NavLinkText from "./NavLinkText";
import NavLinkMotionDiv from "./NavLinkMotionDiv";

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang: Locale;
}

export default function CvNavLink({ onClick, lang }: Props) {
  const dict = getDictionary(lang);
  return (
    <Link
      href="/cv"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <NavLinkMotionDiv bgClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <FaFileAlt className="text-lg text-red-500" />
        <NavLinkText hasCustomBgColor={false} value={dict.navigation.cv} />
      </NavLinkMotionDiv>
    </Link>
  );
}
