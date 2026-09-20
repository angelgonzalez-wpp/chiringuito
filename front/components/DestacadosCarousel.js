'use client';

import { useState } from 'react';

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

export default function DestacadosCarousel({ conciertos }) {
  const [indice, setIndice] = useState(0);

  if (!conciertos || conciertos.length === 0) {
    return (
      <p className="text-center text-cream/60 py-16">
        Todavía no hay conciertos destacados. ¡Vuelve pronto!
      </p>
    );
  }

  const anterior = () =>
    setIndice((i) => (i === 0 ? conciertos.length - 1 : i - 1));
  const siguiente = () =>
    setIndice((i) => (i === conciertos.length - 1 ? 0 : i + 1));

  const actual = conciertos[indice];
  const esGratis = !actual.precio || Number(actual.precio) === 0;

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            actual.imagen ||
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80'
          }
          alt={actual.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <button
          onClick={anterior}
          aria-label="Concierto anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-olive hover:bg-olive-dark transition-colors w-10 h-10 flex items-center justify-center text-white"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          aria-label="Siguiente concierto"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-olive hover:bg-olive-dark transition-colors w-10 h-10 flex items-center justify-center text-white"
        >
          ›
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex gap-2 mb-4 flex-wrap">
            {actual.generos
              ?.split(',')
              .slice(0, 2)
              .map((g) => (
                <span
                  key={g}
                  className="bg-gold text-ink text-xs font-semibold px-3 py-1"
                >
                  {g.trim().toUpperCase()}
                </span>
              ))}
            <span className="bg-olive text-white text-xs font-semibold px-3 py-1">
              ★ DESTACADO
            </span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl mb-2">{actual.titulo}</h3>
          {actual.descripcion ? (
            <p className="text-white/80 max-w-xl mb-4">{actual.descripcion}</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span>📅 {formatearFecha(actual.fecha)}</span>
            <span>🕒 {actual.hora?.slice(0, 5)}h</span>
            <span className="bg-gold text-ink px-3 py-1 text-xs font-semibold">
              {esGratis ? 'GRATIS' : `${Number(actual.precio).toFixed(0)} €`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {conciertos.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setIndice(i)}
            aria-label={`Ir al destacado ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === indice ? 'bg-gold' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
