import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/add-job',
  '/jobs(.*)',
  '/stats',
  '/products(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/products(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Admin routes are protected by API route handlers
  // Middleware just ensures user is authenticated
  if (isAdminRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
