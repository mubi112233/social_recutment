import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Handles locale detection, redirect, and sets `x-html-lang` header.
 * German: /ge or /de, English: /en
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for locale cookie first
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  // Detect browser language if no cookie
  const acceptLang = request.headers.get("accept-language") || "";
  const browserLang = acceptLang.split(",")[0]?.toLowerCase() || "en";
  const isGermanBrowser = browserLang.startsWith("de") || browserLang.startsWith("ge");

  // Determine locale preference
  const preferredLocale = localeCookie || (isGermanBrowser ? "ge" : "en");

  // Handle root path redirect based on preference
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // Set html lang header based on pathname
  const htmlLang =
    pathname.startsWith("/ge") || pathname.startsWith("/de") ? "de" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-html-lang", htmlLang);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

