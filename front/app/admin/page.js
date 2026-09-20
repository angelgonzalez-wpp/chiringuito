'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminConciertoRow from '@/components/admin/AdminConciertoRow';
import ConciertoFormModal from '@/components/admin/ConciertoFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function AdminPage() {
  const router = useRouter();
  const [conciertos, setConciertos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos'); // todos | proximos | pasados

  const [modalAbierto, setModalAbierto] = useState(false);
  const [conciertoEditando, setConciertoEditando] = useState(null);
  const [conciertoAEliminar, setConciertoAEliminar] = useState(null);
  const [borrando, setBorrando] = useState(false);

  const cargarConciertos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/conciertos`, { cache: 'no-store' });
      if (!res.ok) throw new Error('No se pudieron cargar los conciertos');
      const data = await res.json();
      setConciertos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConciertos();
  }, []);

  const hoy = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const totales = useMemo(() => {
    const proximos = conciertos.filter((c) => c.fecha.slice(0, 10) >= hoy).length;
    return {
      total: conciertos.length,
      proximos,
      pasados: conciertos.length - proximos
    };
  }, [conciertos, hoy]);

  const conciertosFiltrados = useMemo(() => {
    return conciertos.filter((c) => {
      const coincideTexto =
        !busqueda ||
        c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.generos?.toLowerCase().includes(busqueda.toLowerCase());

      const esProximo = c.fecha.slice(0, 10) >= hoy;
      const coincideFiltro =
        filtro === 'todos' ||
        (filtro === 'proximos' && esProximo) ||
        (filtro === 'pasados' && !esProximo);

      return coincideTexto && coincideFiltro;
    });
  }, [conciertos, busqueda, filtro, hoy]);

  const abrirCrear = () => {
    setConciertoEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (concierto) => {
    setConciertoEditando(concierto);
    setModalAbierto(true);
  };

  const manejarGuardado = (conciertoGuardado) => {
    setConciertos((prev) => {
      const existe = prev.some((c) => c.id === conciertoGuardado.id);
      if (existe) {
        return prev.map((c) => (c.id === conciertoGuardado.id ? conciertoGuardado : c));
      }
      return [...prev, conciertoGuardado];
    });
    setModalAbierto(false);
  };

  const confirmarEliminar = async () => {
    if (!conciertoAEliminar) return;
    setBorrando(true);
    try {
      const res = await fetch(`/api/conciertos/${conciertoAEliminar.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('No se pudo eliminar el concierto');
      setConciertos((prev) => prev.filter((c) => c.id !== conciertoAEliminar.id));
      setConciertoAEliminar(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setBorrando(false);
    }
  };

  const cerrarSesion = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <main className="bg-cream min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-black/10 mb-8">
          <div>
            <h1 className="font-display text-4xl mb-1">Panel de Administración</h1>
            <p className="text-stone text-sm">Gestiona los conciertos de El CiD</p>
          </div>
          <button
            onClick={abrirCrear}
            className="bg-olive hover:bg-olive-dark transition-colors text-white px-5 py-2.5 text-sm font-medium flex items-center gap-2 self-start sm:self-auto"
          >
            + Nuevo Concierto
          </button>
        </div>

        <div className="flex justify-end mb-6 -mt-4">
          <button
            onClick={cerrarSesion}
            className="text-sm text-stone hover:text-ink underline underline-offset-2"
          >
            Cerrar sesión
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-black/10 p-5">
            <p className="eyebrow text-stone mb-1">TOTAL CONCIERTOS</p>
            <p className="font-display text-3xl">{totales.total}</p>
          </div>
          <div className="border border-black/10 p-5">
            <p className="eyebrow text-stone mb-1">PRÓXIMOS</p>
            <p className="font-display text-3xl text-olive">{totales.proximos}</p>
          </div>
          <div className="border border-black/10 p-5">
            <p className="eyebrow text-stone mb-1">PASADOS</p>
            <p className="font-display text-3xl text-stone/50">{totales.pasados}</p>
          </div>
        </div>

        {/* BUSCADOR + FILTROS */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 border border-black/10 p-3">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar por artista o género..."
            className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-sm placeholder:text-stone/50"
          />
          <div className="flex gap-2">
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'proximos', label: 'Próximos' },
              { key: 'pasados', label: 'Pasados' }
            ].map((op) => (
              <button
                key={op.key}
                onClick={() => setFiltro(op.key)}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${
                  filtro === op.key
                    ? 'bg-olive text-white border-olive'
                    : 'border-black/15 hover:bg-black/5'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTADO */}
        {cargando ? (
          <p className="text-stone text-center py-16">Cargando conciertos...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-16">{error}</p>
        ) : conciertosFiltrados.length === 0 ? (
          <p className="text-stone text-center py-16">
            No hay conciertos que coincidan con la búsqueda.
          </p>
        ) : (
          <div className="space-y-4">
            {conciertosFiltrados.map((concierto) => (
              <AdminConciertoRow
                key={concierto.id}
                concierto={concierto}
                onEditar={abrirEditar}
                onEliminar={setConciertoAEliminar}
              />
            ))}
          </div>
        )}
      </div>

      {modalAbierto ? (
        <ConciertoFormModal
          concierto={conciertoEditando}
          onClose={() => setModalAbierto(false)}
          onGuardado={manejarGuardado}
        />
      ) : null}

      <DeleteConfirmModal
        concierto={conciertoAEliminar}
        borrando={borrando}
        onCancel={() => setConciertoAEliminar(null)}
        onConfirm={confirmarEliminar}
      />
    </main>
  );
}
