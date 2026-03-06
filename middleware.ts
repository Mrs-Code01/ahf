import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes — skip the login page itself
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("adminToken")?.value;

    // No cookie at all — redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify the JWT is valid and not tampered
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      // Token is valid — allow the request through
      return NextResponse.next();
    } catch {
      // Token is invalid or expired — redirect to login and clear the bad cookie
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("adminToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
