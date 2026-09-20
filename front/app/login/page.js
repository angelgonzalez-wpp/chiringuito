'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || 'Credenciales inválidas');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <span className="text-3xl">🌵</span>
          <h1 className="font-display text-3xl mt-2">El CiD</h1>
          <p className="text-stone text-sm">Panel de Administración</p>
        </div>

        <form
          onSubmit={manejarSubmit}
          className="bg-white border border-black/10 p-6 space-y-4"
        >
          {error ? (
            <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {error}
            </p>
          ) : null}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 px-3 py-2 focus:outline-none focus:border-olive"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/15 px-3 py-2 focus:outline-none focus:border-olive"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-olive hover:bg-olive-dark transition-colors text-white py-2.5 font-medium disabled:opacity-60"
          >
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
