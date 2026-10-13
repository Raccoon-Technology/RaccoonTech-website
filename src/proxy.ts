import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isLocalPagePath } from "./lib/local-pages";

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Local landing pages exist in Portuguese only. Serve them directly, so locale detection
  // never sends someone with an English browser to a /en/... URL that does not exist.
  if (isLocalPagePath(pathname)) {
    return NextResponse.rewrite(new URL(`/pt-BR${pathname}`, request.url));
  }
  for (const prefix of ["/en", "/pt-BR"]) {
    const rest = pathname.slice(prefix.length);
    if (pathname.startsWith(`${prefix}/`) && isLocalPagePath(rest)) {
      return NextResponse.redirect(new URL(rest, request.url), 308);
    }
  }

  return handleI18n(request);
}

export const config = {
  // Skip API routes, Next internals, generated icons and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|icon$|apple-icon$|.*opengraph-image$|.*\\..*).*)"],
};
