import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Basic ")) {
    try {
      const credentials = atob(authorization.slice(6));
      const separator = credentials.indexOf(":");

      const username = separator >= 0 ? credentials.slice(0, separator) : "";
      const password = separator >= 0 ? credentials.slice(separator + 1) : "";

      if (username === expectedUser && password === expectedPassword) {
        return NextResponse.next();
      }
    } catch {
      // Invalid Basic Auth header.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="LiveSell Admin", charset="UTF-8"'
    }
  });
}

export const config = {
  matcher: ["/admin/:path*"]
};
