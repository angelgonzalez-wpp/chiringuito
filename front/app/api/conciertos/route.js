import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function POST(request) {
  const token = cookies().get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ mensaje: 'No autenticado' }, { status: 401 });
  }

  const body = await request.json();

  const backendRes = await fetch(`${API_URL}/api/conciertos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
