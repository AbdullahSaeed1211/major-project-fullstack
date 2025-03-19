import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// List of public routes that don't require authentication
const publicPaths = [
  "/",
  "/about",
  "/cognitive-games",
  "/brain-health",
  "/contact",
  "/api/newsletter",
  "/api/webhooks/clerk",
];

// Function to match a URL path against a list of allowed paths
function isPublicPath(path: string) {
  return publicPaths.find((publicPath) => 
    path === publicPath || 
    path.startsWith(`${publicPath}/`)
  );
}

export function middleware(req: NextRequest) {
  const { userId } = getAuth(req);
  const path = req.nextUrl.pathname;

  // If the path is public or the user is authenticated, continue
  if (isPublicPath(path) || userId) {
    return NextResponse.next();
  }

  // Otherwise, redirect to sign-in
  const signInUrl = new URL("/sign-in", req.url);
  signInUrl.searchParams.set("redirect_url", path);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
}; 