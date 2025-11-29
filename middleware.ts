import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const path = req.nextUrl.pathname;

  // PUBLIC ROUTES (no login required)
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // PROTECTED ROUTES (login required)
  const protectedRoutes = ["/dashboard", "/admin", "/artist"];
  const needsAuth = protectedRoutes.some((route) => path.startsWith(route));

  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ROLE-BASED PROTECTION
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/artist") && role !== "artist") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/dashboard") && !["user", "admin", "artist"].includes(role || "")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Only run middleware for the routes below:
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/artist/:path*",
    "/login",
    "/register",
    "/", // home
  ],
};
