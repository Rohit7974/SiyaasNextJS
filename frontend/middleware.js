import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;
    const user = request.cookies.get('user')?.value;

    if (!token || !user) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    try {
      const userData = JSON.parse(user);
      // Check if user is admin
      if (userData._id !== 'admin' && userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
