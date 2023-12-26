import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;
  const userInfo = request.cookies.get('user')?.value;
  const user = userInfo && JSON.parse(userInfo!.toString());
  if (
    (!token || !user) &&
    !pathname.includes('/user/login') &&
    !pathname.includes('/user/register')
  )
    return NextResponse.redirect(new URL('/user/login', request.url));
}

export const config = {
  matcher: [
    '/',
    '/user/:path',
    '/user/login',
    '/user/register',
    '/profile',
    '/boards',
    '/boards/:path',
  ],
};
