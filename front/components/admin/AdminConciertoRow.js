'use client';

const formatearFechaCorta = (fechaISO) => {
  const fecha = new Date(fechaISO + 'T00:00:00');
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
};

export default function AdminConciertoRow({ concierto, onEditar, onEliminar }) {
  const { titulo, descripcion, fecha, hora, generos, precio, imagen } = concierto;
  const esGratis = !precio || Number(precio) === 0;
  const primerGenero = generos?.split(',')[0]?.trim();

  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-black/5 bg-white p-4">
      <div className="relative w-full sm:w-32 h-32 shrink-0 overflow-hidden bg-stone/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            imagen ||
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80'
          }
          alt={titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="font-display text-lg leading-tight">{titulo}</h3>
            {generos ? (
              <p className="text-sm italic text-stone">{generos}</p>
            ) : null}
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onEditar(concierto)}
              className="border border-ink/20 hover:bg-ink/5 transition-colors px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => onEliminar(concierto)}
              className="border border-red-300 text-red-600 hover:bg-red-50 transition-colors px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        {descripcion ? (
          <p className="text-sm text-stone mt-2">{descripcion}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-stone">
          <span>📅 {formatearFechaCorta(fecha)}</span>
          <span>🕒 {hora?.slice(0, 5)}h</span>
          {primerGenero ? <span>🏷 {primerGenero}</span> : null}
          <span className="text-gold-dark font-medium">
            € {esGratis ? 'Entrada libre' : `${Number(precio).toFixed(0)} €`}
          </span>
        </div>
      </div>
    </div>
  );
}
