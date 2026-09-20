import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const respuesta = NextResponse.redirect(new URL('/login', request.url));
      respuesta.cookies.set('admin_token', '', { path: '/', maxAge: 0 });
      return respuesta;
    }

    return NextResponse.next();
  } catch (error) {
    // El backend no respondió (¿está corriendo?)
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*']
};
