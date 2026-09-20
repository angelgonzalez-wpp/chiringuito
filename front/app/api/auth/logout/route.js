import { NextResponse } from 'next/server';

export async function POST() {
  const respuesta = NextResponse.json({ mensaje: 'Sesión cerrada' });
  respuesta.cookies.set('admin_token', '', { path: '/', maxAge: 0 });
  return respuesta;
}
