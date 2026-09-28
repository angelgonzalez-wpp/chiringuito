'use client';

import { useEffect, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

// La API devuelve la fecha como ISO completo ("2026-09-21T22:00:00.000Z")
// y el input type="date" solo acepta YYYY-MM-DD, así que la normalizamos.
const aFechaInput = (valor) => {
  if (!valor) return '';
  const texto = String(valor);
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return texto;

  const fecha = new Date(texto);
  if (Number.isNaN(fecha.getTime())) return texto.slice(0, 10);

  return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}`;
};

// La API devuelve la hora como HH:MM:SS y el input type="time" usa HH:MM.
const aHoraInput = (valor) => (valor ? String(valor).slice(0, 5) : '');

const claseInput =
  'w-full bg-white border border-black/10 rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-stone/50 focus:outline-none focus:border-olive transition-colors';

function Campo({ etiqueta, requerido, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-2">
        {etiqueta}
        {requerido ? <span aria-hidden="true"> *</span> : null}
        {hint ? <span className="font-normal text-stone/70"> {hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export default function ConciertoFormModal({ concierto, onClose, onGuardado }) {
  const [form, setForm] = useState({
    titulo: concierto?.titulo || '',
    fecha: aFechaInput(concierto?.fecha),
    hora: aHoraInput(concierto?.hora),
    descripcion: concierto?.descripcion || '',
    generos: concierto?.generos || '',
    precio: concierto?.precio || '',
    instagram: concierto?.instagram || '',
    facebook: concierto?.facebook || '',
    youtube: concierto?.youtube || '',
    destacado: Boolean(concierto?.destacado)
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(concierto?.imagen || '');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Libera el object URL del preview al cambiar de imagen o al cerrar el modal
  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDestacadoChange = (e) => {
    setForm((prev) => ({ ...prev, destacado: e.target.checked }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagenFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });

      if (imagenFile) {
        fd.append('imagen', imagenFile);
      }

      const url = concierto ? `/api/conciertos/${concierto.id}` : '/api/conciertos';
      const method = concierto ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: fd
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const detalles = data?.errores?.map((e) => e.mensaje).join(' · ');
        throw new Error(
          detalles || data?.mensaje || data?.message || 'Error al guardar el concierto'
        );
      }

      await onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
      <div className="bg-cream rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
          <h2 className="font-display text-3xl text-ink">
            {concierto ? 'Editar Concierto' : 'Nuevo Concierto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink/50 hover:text-ink transition-colors text-xl leading-none mt-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="px-6 pb-4 space-y-5 overflow-y-auto min-h-0 flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Campo etiqueta="Nombre del Artista/Banda" requerido>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
                className={claseInput}
              />
            </Campo>

            <div className="grid grid-cols-2 gap-4">
              <Campo etiqueta="Fecha" requerido>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  required
                  className={claseInput}
                />
              </Campo>
              <Campo etiqueta="Hora" requerido>
                <input
                  type="time"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  className={claseInput}
                />
              </Campo>
            </div>

            <Campo
              etiqueta="Descripción"
              hint="(opcional · máx. 140 caracteres)"
            >
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                maxLength={140}
                rows={4}
                className={`${claseInput} resize-y`}
              />
            </Campo>

            <div className="grid grid-cols-2 gap-4">
              <Campo etiqueta="Estilo Musical" hint="(opcional)">
                <input
                  name="generos"
                  value={form.generos}
                  onChange={handleChange}
                  placeholder="Ej: Rock, Jazz, Flamenco..."
                  className={claseInput}
                />
              </Campo>
              <Campo etiqueta="Precio de Entrada" requerido>
                <input
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="Ej: Entrada libre, 5 €..."
                  required
                  className={claseInput}
                />
              </Campo>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-black/10 bg-white p-4 cursor-pointer">
              <input
                type="checkbox"
                name="destacado"
                checked={form.destacado}
                onChange={handleDestacadoChange}
                className="mt-0.5 h-4 w-4 accent-olive"
              />
              <span className="text-sm font-semibold text-ink">
                Concierto destacado
                <span className="mt-0.5 block text-xs font-normal text-stone/70">
                  Aparecerá en el carrusel ★ Destacados de la web pública.
                </span>
              </span>
            </label>

            <div className="border-t border-black/10 pt-5">
              <p className="mb-4 text-base font-semibold text-ink">
                Redes Sociales
                <span className="font-normal text-stone/70"> (opcional)</span>
              </p>

              <div className="space-y-4">
                <Campo etiqueta="Instagram">
                  <input
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className={claseInput}
                  />
                </Campo>
                <Campo etiqueta="Facebook">
                  <input
                    name="facebook"
                    value={form.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    className={claseInput}
                  />
                </Campo>
                <Campo etiqueta="YouTube">
                  <input
                    name="youtube"
                    value={form.youtube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                    className={claseInput}
                  />
                </Campo>
              </div>
            </div>

            <Campo
              etiqueta="Imagen del concierto"
              hint="(opcional · JPG, PNG, WEBP o GIF · máx. 5 MB)"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full cursor-pointer rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-stone transition-colors file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-olive file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-olive-dark focus:outline-none focus:border-olive"
              />
            </Campo>

            {preview ? (
              <div className="rounded-lg border border-black/10 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Previsualización de la imagen del concierto"
                  className="mx-auto max-h-40 w-auto max-w-full rounded object-contain"
                />
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="mx-6 mb-3 shrink-0 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <div className="flex shrink-0 gap-3 border-t border-black/10 px-6 py-5">
            <button
              type="submit"
              disabled={guardando}
              className="flex-1 rounded-lg bg-olive py-3 text-sm font-medium text-white transition-colors hover:bg-olive-dark disabled:opacity-60"
            >
              {guardando ? 'Guardando...' : concierto ? 'Guardar Cambios' : 'Crear Concierto'}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={guardando}
              className="rounded-lg border border-black/15 bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-black/5 disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
