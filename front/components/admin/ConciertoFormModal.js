'use client';

import { useEffect, useState } from 'react';

const vacio = {
  titulo: '',
  fecha: '',
  hora: '',
  descripcion: '',
  generos: '',
  precio: '',
  imagen: '',
  instagram: '',
  facebook: '',
  youtube: ''
};

export default function ConciertoFormModal({ concierto, onClose, onGuardado }) {
  const [form, setForm] = useState(vacio);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const esEdicion = Boolean(concierto);

  useEffect(() => {
    if (concierto) {
      setForm({
        titulo: concierto.titulo || '',
        fecha: concierto.fecha ? concierto.fecha.slice(0, 10) : '',
        hora: concierto.hora ? concierto.hora.slice(0, 5) : '',
        descripcion: concierto.descripcion || '',
        generos: concierto.generos || '',
        precio: concierto.precio ?? '',
        imagen: concierto.imagen || '',
        instagram: concierto.instagram || '',
        facebook: concierto.facebook || '',
        youtube: concierto.youtube || ''
      });
    } else {
      setForm(vacio);
    }
    setError(null);
  }, [concierto]);

  const actualizarCampo = (campo) => (e) =>
    setForm((f) => ({ ...f, [campo]: e.target.value }));

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    const payload = {
      titulo: form.titulo,
      fecha: form.fecha,
      hora: form.hora.length === 5 ? `${form.hora}:00` : form.hora,
      descripcion: form.descripcion,
      generos: form.generos,
      precio: form.precio === '' ? 0 : Number(form.precio),
      imagen: form.imagen || undefined,
      instagram: form.instagram || undefined,
      facebook: form.facebook || undefined,
      youtube: form.youtube || undefined
    };

    try {
      const url = esEdicion
        ? `/api/conciertos/${concierto.id}`
        : `/api/conciertos`;

      const res = await fetch(url, {
        method: esEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        const detalle = data.errores?.map((e) => e.mensaje).join(' · ') || data.mensaje;
        throw new Error(detalle || 'No se pudo guardar el concierto');
      }

      onGuardado(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
      <div className="bg-cream max-w-md w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-stone hover:text-ink text-lg"
        >
          ✕
        </button>

        <h3 className="font-display text-2xl mb-6">
          {esEdicion ? 'Editar Concierto' : 'Nuevo Concierto'}
        </h3>

        {error ? (
          <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 mb-4">
            {error}
          </p>
        ) : null}

        <form onSubmit={manejarSubmit} className="space-y-5 text-sm">
          <div>
            <label className="block font-medium mb-1">
              Nombre del Artista/Banda <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.titulo}
              onChange={actualizarCampo('titulo')}
              className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="date"
                value={form.fecha}
                onChange={actualizarCampo('fecha')}
                className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="time"
                value={form.hora}
                onChange={actualizarCampo('hora')}
                className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Descripción <span className="text-red-500">*</span>{' '}
              <span className="text-stone font-normal">(máx. 140 caracteres)</span>
            </label>
            <textarea
              required
              maxLength={140}
              rows={3}
              value={form.descripcion}
              onChange={actualizarCampo('descripcion')}
              className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Estilo Musical <span className="text-red-500">*</span>
              </label>
              <input
                required
                placeholder="Ej: Rock, Jazz, Flamenco..."
                value={form.generos}
                onChange={actualizarCampo('generos')}
                className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Precio de Entrada <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.5"
                placeholder="0 = Entrada libre"
                value={form.precio}
                onChange={actualizarCampo('precio')}
                className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              URL de la Imagen <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="url"
              placeholder="https://..."
              value={form.imagen}
              onChange={actualizarCampo('imagen')}
              className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
            />
          </div>

          <div className="border-t border-ink/10 pt-5">
            <p className="text-xs font-medium text-stone mb-4">
              Redes Sociales <span className="italic">(opcional)</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Instagram</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={form.instagram}
                  onChange={actualizarCampo('instagram')}
                  className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Facebook</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/..."
                  value={form.facebook}
                  onChange={actualizarCampo('facebook')}
                  className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">YouTube</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  value={form.youtube}
                  onChange={actualizarCampo('youtube')}
                  className="w-full border border-ink/15 px-3 py-2 bg-white focus:outline-none focus:border-olive placeholder:text-stone/50"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="flex-1 bg-olive hover:bg-olive-dark transition-colors text-white py-2.5 font-medium disabled:opacity-60"
            >
              {guardando
                ? 'Guardando...'
                : esEdicion
                ? 'Guardar Cambios'
                : 'Crear Concierto'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={guardando}
              className="px-5 border border-ink/20 hover:bg-ink/5 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
