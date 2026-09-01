import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { capabilityForPath, can } from "@/lib/admin/permissions";

/**
 * Gate for /admin.
 *
 * Built from the edge-safe half of the auth config. Importing the full config
 * would pull Prisma, and therefore node:path, into the edge bundle and fail
 * the build. Verifying the signed JWT needs no database.
 *
 * Renamed from middleware.ts: Next 16 deprecated that convention in favour of
 * proxy.ts.
 *
 * Disallowing /admin in robots.txt is not access control. It asks well-behaved
 * crawlers not to look and does nothing about anyone who visits the URL. This
 * is the gate, and it runs before any admin page renders.
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // The login page has to stay reachable while signed out.
  if (pathname === "/admin/login") {
    if (req.auth) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  if (!req.auth) {
    const login = new URL("/admin/login", req.url);
    // Send the visitor back where they were headed once they sign in.
    login.searchParams.set("from", pathname + req.nextUrl.search);
    return NextResponse.redirect(login);
  }

  // Signed in is not the same as allowed. A content specialist who types
  // /admin/finance is authenticated and must still be turned away.
  const needed = capabilityForPath(pathname);
  const role = req.auth.user?.role;
  if (needed && role && !can(role, needed)) {
    return NextResponse.redirect(new URL("/admin?denied=1", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
