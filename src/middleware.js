// ============================================
// 3. middleware.js - Protect routes (ROOT LEVEL)
// ============================================
export { auth as middleware } from "./auth";

export const config = {
  matcher: ["/", "/dashboard/:path*", "/calendar/:path*", "/admin/:path*"],
};
