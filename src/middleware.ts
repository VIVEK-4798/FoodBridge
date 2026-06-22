import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple middleware placeholder. Could be extended for auth checks.
  // For now, just log and continue.
  console.log('Middleware:', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
