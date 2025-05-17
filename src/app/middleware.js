"use client";

// middleware.js - place this file in your project root
import { NextResponse } from "next/server";

// Auth pages that don't need protection
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by looking for the auth cookie/token
  // Adjust this to match how your app tracks authentication
  const isAuthenticated = request.cookies.has("auth_token"); // Replace with your actual auth cookie name

  // Check if this is an auth page
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue with the request if all checks pass
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /favicon.ico, /robots.txt (static files)
     */
    "/((?!api|_next|fonts|images|favicon.ico|robots.txt).*)",
  ],
};
