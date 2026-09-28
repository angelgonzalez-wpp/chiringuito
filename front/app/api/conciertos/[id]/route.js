import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL || 'http://localhost:3000';

const obtenerToken = () => cookies().get('admin_token')?.value;

export async function PUT(request, { params }) {
  const token = obtenerToken();
  if (!token) {
    return NextResponse.json({ mensaje: 'No autenticado' }, { status: 401 });
  }

  // El formulario envía multipart/form-data (incluye el fichero de imagen),
  // así que reenviamos el cuerpo tal cual, conservando el Content-Type con su boundary.
  const body = await request.arrayBuffer();
  const contentType = request.headers.get('content-type') || 'application/json';

  const backendRes = await fetch(`${API_URL}/api/conciertos/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`
    },
    body
  });

  const data = await backendRes.json().catch(() => ({
    mensaje: 'El servidor no pudo procesar la petición'
  }));
  return NextResponse.json(data, { status: backendRes.status });
}

export async function DELETE(request, { params }) {
  const token = obtenerToken();
  if (!token) {
    return NextResponse.json({ mensaje: 'No autenticado' }, { status: 401 });
  }

  const backendRes = await fetch(`${API_URL}/api/conciertos/${params.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
