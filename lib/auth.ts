/**
 * Standardized authentication helpers for Clerk
 */
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles authentication for route handlers in App Router
 * @returns The authenticated userId or throws a 401 response
 */
export async function requireAuth() {
  const session = await auth();
  if (!session.userId) {
    throw new Error('Unauthorized');
  }
  return session.userId;
}

/**
 * Protected route handler wrapper with improved type safety for Next.js 15
 */
export async function protectApiRoute(handler: (userId: string) => Promise<NextResponse>) {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(session.userId);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

// Add compatibility function for existing code using withAuth pattern
export function withAuth(handler: (request: NextRequest, userId: string) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    return protectApiRoute((userId) => handler(request, userId));
  };
}

interface ErrorOptions {
  status?: number;
  code?: string;
  details?: unknown;
}

// Enhanced createErrorResponse that handles both formats
export function createErrorResponse(
  message: string,
  statusOrOptions: number | ErrorOptions = 500
) {
  if (typeof statusOrOptions === 'number') {
    return NextResponse.json(
      { error: message },
      { status: statusOrOptions }
    );
  } else {
    const { status = 500, code, details } = statusOrOptions;
    const errorObj: Record<string, unknown> = { message };
    
    if (code) errorObj.code = code;
    if (details !== undefined) errorObj.details = details;
    
    return NextResponse.json(
      { error: errorObj },
      { status }
    );
  }
} 