import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function POST(request) {
  const { email, password } = await request.json();

  const backendRes = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { mensaje: data.mensaje || 'Credenciales inválidas' },
      { status: backendRes.status }
    );
  }

  const respuesta = NextResponse.json({ usuario: data.usuario });

  // La cookie es httpOnly: JavaScript del navegador no puede leerla,
  // lo que protege el token si algún día hay una vulnerabilidad XSS.
  respuesta.cookies.set('admin_token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 día, igual que JWT_EXPIRES_IN en el backend
  });

  return respuesta;
}
