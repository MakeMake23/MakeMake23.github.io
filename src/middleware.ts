import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { Locale } from "./dictionaries";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE");
  const localeFromCookie = cookie?.value;

  if (localeFromCookie && i18n.locales.includes(localeFromCookie as any)) {
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

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|profile.png|andy-ledesma-garcia-cv.pdf|andy-ledesma-garcia-cv-es.pdf).*)",
  ],
};
