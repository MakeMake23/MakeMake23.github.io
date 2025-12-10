"use client";

import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";
import { FaHandPeace } from "react-icons/fa";
import NavLinkText from "./NavLinkText";
import NavLinkMotionDiv from "./NavLinkMotionDiv";

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang: Locale;
}

export default function ContactNavLink({ onClick, lang }: Props) {
  const pathname = usePathname();
  const isContact = pathname.includes("#links");
  const dict = getDictionary(lang);

  return (
    <Link href="/#links" onClick={onClick}>
      <NavLinkMotionDiv
        bgClassName={
          isContact
            ? "bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-700"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }
      >
        <FaHandPeace
          className={`text-lg ${isContact ? "text-white" : "text-green-500"}`}
        />
        <NavLinkText
          hasCustomBgColor={isContact}
          value={dict.navigation.say_hi}
        />
      </NavLinkMotionDiv>
    </Link>
  );
}
