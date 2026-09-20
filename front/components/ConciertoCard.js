const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO + 'T00:00:00');
  const texto = fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

const formatearHora = (hora) => hora?.slice(0, 5);

export default function ConciertoCard({ concierto }) {
  const {
    titulo,
    descripcion,
    fecha,
    hora,
    generos,
    precio,
    imagen,
    destacado
  } = concierto;

  const esGratis = !precio || Number(precio) === 0;

  return (
    <article className="bg-white flex flex-col border border-black/5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagen || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80'}
          alt={titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-gold text-ink text-xs font-semibold px-3 py-1">
            {esGratis ? 'ENTRADA LIBRE' : `${Number(precio).toFixed(0)} €`}
          </span>
          {destacado ? (
            <span className="bg-olive text-white text-xs font-semibold px-3 py-1 flex items-center gap-1">
              ★ DESTACADO
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-stone flex items-center gap-1 mb-2">
          📅 {formatearFecha(fecha)}
        </p>
        <h3 className="font-display text-xl mb-2">{titulo}</h3>
        {descripcion ? (
          <p className="text-sm text-stone leading-relaxed mb-4">{descripcion}</p>
        ) : null}

        <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between text-xs text-stone">
          <span>🕒 {formatearHora(hora)} h</span>
          {generos ? <span>🏷 {generos.split(',')[0]}</span> : null}
        </div>
      </div>
    </article>
  );
}
