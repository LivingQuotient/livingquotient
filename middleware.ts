/*
// EXISTING next-auth middleware

import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}

*/

// TEMPORARY password gate for production preview
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const username = "charlesjohnson"
const password = "Oliveiscute1995!"
const authHeader = `Basic ${btoa(`${username}:${password}`)}`

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization")

  if (auth === authHeader) {
    return NextResponse.next()
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Preview"',
    },
  })
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}
