import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware({ nextUrl }: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  const pathname = nextUrl.pathname;
  const publicOnlyRoutes = process.env.PUBLIC_ONLY_ROUTES?.split(",") || [];
  const memberOnlyRoutes = process.env.MEMBER_ONLY_ROUTES?.split(",") || [];
  let isLoggedin = !!accessToken;

  if (
    pathname.startsWith("/playground") &&
    process.env.NODE_ENV === "production"
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (pathname.startsWith("/auth") && !nextUrl.searchParams.has("code")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  for (let i = 0; i < publicOnlyRoutes.length; i++) {
    if (pathname.startsWith(publicOnlyRoutes[i]) && isLoggedin) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  for (let i = 0; i < memberOnlyRoutes.length; i++) {
    if (pathname.startsWith(memberOnlyRoutes[i]) && !isLoggedin) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
