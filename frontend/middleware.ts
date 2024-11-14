import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs automatically for routes defined in the matcher
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/articles/new') ||
                          request.nextUrl.pathname.startsWith('/articles/edit');

  // Redirect to login if trying to access protected route without token
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to home if trying to access auth pages while logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/articles/new',
    '/articles/edit/:path*',
    '/login',
    '/register'
  ]
}; 