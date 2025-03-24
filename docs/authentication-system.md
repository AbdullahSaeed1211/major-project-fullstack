# Authentication System Documentation

## Current Implementation: Mock Authentication

The application currently uses a mock authentication system for development purposes. This implementation is located in `lib/auth.mock.ts` and provides simplified authentication functionality while avoiding the need to set up a complete authentication service during early development.

### Mock Authentication Components

1. **AuthenticatedHandler Type**:
   ```typescript
   export type AuthenticatedHandler = (
     request: NextRequest,
     userId: string
   ) => Promise<NextResponse>;
   ```
   This type defines the structure for Next.js API route handlers that require authentication.

2. **withAuth Function**:
   ```typescript
   export function withAuth(handler: AuthenticatedHandler) {
     return async (request: NextRequest) => {
       try {
         // Mock user ID for development
         const userId = "user-123456";
         
         // Call the handler with the mock user ID
         return handler(request, userId);
       } catch (error) {
         console.error("Authentication error:", error instanceof Error ? error.message : "Unknown error");
         return createErrorResponse("Unauthorized", 401);
       }
     };
   }
   ```
   This higher-order function wraps API route handlers, injecting a mock user ID ("user-123456") for all requests.

3. **getCurrentUserId Function**:
   ```typescript
   export function getCurrentUserId(): string | null {
     // Return a mock user ID for development
     return "user-123456";
   }
   ```
   This utility function returns the mock user ID for client-side components.

4. **createErrorResponse Function**:
   ```typescript
   export function createErrorResponse(message: string, status: number = 400): NextResponse {
     return NextResponse.json(
       { error: message },
       { status }
     );
   }
   ```
   A helper function that creates standardized error responses.

### Current Usage

The mock authentication system is currently imported in the following API route files:

- `app/api/goals/route.ts`
- `app/api/progress/route.ts`
- `app/api/health-metrics/route.ts`
- `app/api/health-metrics/analysis/route.ts`

These routes use the `withAuth` wrapper to secure endpoints and access the user ID.

## Migration to Production Authentication

To replace the mock authentication with a production-ready solution, we recommend using Clerk, a complete authentication and user management service that integrates well with Next.js.

### Step 1: Install Clerk

```bash
npm install @clerk/nextjs
```

### Step 2: Configure Environment Variables

Create or update `.env.local` with your Clerk API keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Step 3: Set Up Clerk Provider

Update your `app/layout.tsx` file:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Step 4: Create Real Authentication Utilities

Replace `lib/auth.mock.ts` with `lib/auth.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs";

export type AuthenticatedHandler = (
  request: NextRequest,
  userId: string
) => Promise<NextResponse>;

export function createErrorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json(
    { error: message },
    { status }
  );
}

export function withAuth(handler: AuthenticatedHandler) {
  return async (request: NextRequest) => {
    try {
      const { userId } = auth();
      
      if (!userId) {
        return createErrorResponse("Unauthorized", 401);
      }
      
      return handler(request, userId);
    } catch (error) {
      console.error("Authentication error:", error instanceof Error ? error.message : "Unknown error");
      return createErrorResponse("Unauthorized", 401);
    }
  };
}

export function getCurrentUserId(): string | null {
  const { userId } = getAuth();
  return userId;
}
```

### Step 5: Update API Routes

Update all API route imports from `@/lib/auth.mock` to `@/lib/auth`:

```typescript
// Before
import { withAuth, createErrorResponse } from "@/lib/auth.mock";

// After
import { withAuth, createErrorResponse } from "@/lib/auth";
```

No other changes are needed in the API routes as the function signatures remain the same.

### Step 6: Add Authentication Middleware

Create a middleware file at the root of your project to protect routes:

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/public"],
});

export const config = {
  // Match all request paths except for the ones starting with:
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Step 7: Create Authentication Pages

Create sign-in and sign-up pages:

```typescript
// app/sign-in/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}

// app/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
    </div>
  );
}
```

### Step 8: Add User Profile Components

Add user profile components to your layout or navigation:

```typescript
// components/user-button.tsx
"use client";

import { UserButton } from "@clerk/nextjs";

export function UserProfileButton() {
  return <UserButton afterSignOutUrl="/" />;
}
```

### Step 9: Protecting Client Components

For client components that need authentication state:

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";

export function ProtectedClientComponent() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in to access this content</div>;
  }
  
  return <div>Protected content for user {userId}</div>;
}
```

### Step 10: Protecting Server Components

For server components that need authentication state:

```typescript
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedServerComponent() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return <div>Protected server content for {user.firstName}</div>;
}
```

## Testing Authentication

After implementing the real authentication system:

1. Test sign-up and sign-in flows
2. Verify protected routes redirect unauthenticated users
3. Ensure API endpoints properly validate user authentication
4. Test user-specific data isolation (users should only see their own data)

## Additional Considerations

### Multi-tenancy

If your application requires organizations or teams:

```typescript
import { OrganizationSwitcher } from "@clerk/nextjs";

export function OrgSwitcher() {
  return (
    <OrganizationSwitcher 
      afterCreateOrganizationUrl="/organization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
}
```

### Social Authentication

Enable social logins (Google, GitHub, etc.) through the Clerk dashboard.

### Custom JWT Templates

If you need custom claims in your JWT for external services:

1. Configure JWT templates in the Clerk dashboard
2. Access the session token in your application:

```typescript
import { auth } from "@clerk/nextjs/server";

export async function getSessionToken() {
  const { getToken } = auth();
  const token = await getToken();
  return token;
}
```

## Security Best Practices

1. **Always validate user IDs** in your API routes
2. **Implement CSRF protection** (built into Clerk)
3. **Use environment variables** for all Clerk keys
4. **Enable MFA** for enhanced security
5. **Implement rate limiting** on authentication endpoints

## Migration Process

To minimize disruption, we recommend:

1. Implement Clerk authentication in a development environment
2. Write and test the authentication transition
3. Migrate your database to associate data with real user IDs
4. Deploy the authentication changes in a single release

## Conclusion

Replacing the mock authentication with Clerk provides a robust, secure authentication system with minimal code changes. The mock authentication was designed with this transition in mind, using the same function signatures to make the migration process seamless. 