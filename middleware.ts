import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a matcher for public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/cognitive-games",
  "/brain-health",
  "/contact",
  "/api/newsletter",
  "/api/webhooks/clerk",
  "/api/newsletter/(.*)",
  "/api/webhooks/clerk/(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // If the path is not public, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
}; 