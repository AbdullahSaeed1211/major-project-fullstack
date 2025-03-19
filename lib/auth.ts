/**
 * Standardized authentication helpers for Clerk
 */
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles authentication for route handlers in App Router
 * @param request The NextRequest object
 * @returns The authenticated userId or throws a 401 response
 */
export async function requireAuth(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const { userId } = getAuth({ request });
    
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    return userId;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

/**
 * Protected route handler wrapper
 * @param handler The route handler function to protect
 * @returns A wrapped handler that checks for authentication
 */
export function withAuth<T = unknown>(
  handler: (
    request: NextRequest,
    userId: string,
    context?: T
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: T) => {
    const userId = await requireAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    return handler(request, userId, context);
  };
}

/**
 * Standard error response creator
 */
export function createErrorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    { error: message },
    { status }
  );
} 