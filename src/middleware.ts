import { NextRequest,NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from "@/i18n-config";
import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute  = createRouteMatcher([
  '/api/home(.*)'
]);

// @ts-ignore locales are readonly
const locales: string[] = i18n.locales.map((locale) => locale.toString());

// 使用 clerkMiddleware 处理请求
export default clerkMiddleware((auth, request, event) => { 
 

  if (isProtectedRoute (request)){
      return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname


  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next();


  const locale = getLocale(request)

  if (pathname.startsWith('/index.html')) {
    request.nextUrl.pathname = `/${locale}`
  }else {
    request.nextUrl.pathname = `/${locale}${pathname}`
  }
  return NextResponse.redirect(request.nextUrl);
  
 }, {debug: true});


function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|robots.txt|sitemap.xml|assets|favicon|posts).*)',
    '/', // Run middleware on index page
    '/(api|trpc)(.*)' // Run middleware on API routes
  ],
}
