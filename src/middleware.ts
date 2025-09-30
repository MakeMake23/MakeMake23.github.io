import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { Locale } from "./dictionaries";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE");
  const localeFromCookie = cookie?.value as Locale;

  if (localeFromCookie && i18n.locales.includes(localeFromCookie)) {
    return localeFromCookie as Locale;
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${
      pathname.startsWith("/") ? "" : "/"
    }${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|profile.png|profile-meta-tag.jpg|profile-meta-tag-es.jpg|andy-ledesma-garcia-cv.pdf|andy-ledesma-garcia-cv-es.pdf).*)",
  ],
};
