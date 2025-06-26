import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';

function getLocale(request: NextRequest): string {
  // Get the preferred locale from the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Simple check for Spanish preference
  const preferSpanish = acceptLanguage.includes('es') || 
                       acceptLanguage.includes('es-') || 
                       acceptLanguage.startsWith('es');
  
  return preferSpanish ? 'es' : i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|profile.jpeg|andy-ledesma-garcia-cv.pdf|andy-ledesma-garcia-cv-es.pdf).*)'],
};
