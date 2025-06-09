// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Get cookies using Next.js native method
  const authToken = req.cookies.get("authToken")?.value;
  const isAuthenticated = authToken === "authenticated";

  // 2. Protect admin routes (aligned with matcher config)
  if (pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // 3. Correct matcher to protect all admin routes
  matcher: ["/admin/:path*"],
};
