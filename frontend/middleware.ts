import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware (req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET as string, salt: process.env.AUTH_SECRET as string });

  console.log('token', token);
  // if (!token) {
  //   // If no token, redirect to login page
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // If token exists, continue to the requested page
  return NextResponse.next();
}
