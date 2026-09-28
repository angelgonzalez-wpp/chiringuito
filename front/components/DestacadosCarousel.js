'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
  const slideRef = useRef(null);
  const indiceAnteriorRef = useRef(indice);
  const direccionRef = useRef(1);
  const transicionActivaRef = useRef(false);

  useLayoutEffect(() => {
    if (indiceAnteriorRef.current === indice) return;
    indiceAnteriorRef.current = indice;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      transicionActivaRef.current = false;
      return;
    }

    const timeline = gsap.fromTo(
      slideRef.current,
      { x: direccionRef.current * 72, autoAlpha: 0.6 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          transicionActivaRef.current = false;
        }
      }
    );

    return () => timeline.kill();
  }, [indice]);

  if (!conciertos || conciertos.length === 0) {
    return (
      <p className="text-center text-cream/60 py-16">
        Todavía no hay conciertos destacados. ¡Vuelve pronto!
      </p>
    );
  }

  const cambiarA = (nuevoIndice, direccion) => {
    if (nuevoIndice === indice || transicionActivaRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndice(nuevoIndice);
      return;
    }

    transicionActivaRef.current = true;
    direccionRef.current = direccion;
    gsap.to(slideRef.current, {
      x: direccion * -72,
      autoAlpha: 0.6,
      duration: 0.22,
      ease: 'power1.in',
      onComplete: () => setIndice(nuevoIndice)
    });
  };

  const anterior = () =>
    cambiarA(
      indice === 0 ? conciertos.length - 1 : indice - 1,
      -1
    );
  const siguiente = () =>
    cambiarA(
      indice === conciertos.length - 1 ? 0 : indice + 1,
      1
    );

  const actual = conciertos[indice];
  const esGratis = !actual.precio || Number(actual.precio) === 0;

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="group relative aspect-[16/9] w-full overflow-hidden bg-stone/20">
        <div className="absolute inset-0" ref={slideRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              actual.imagen ||
              '/images/MultitudEnUnConcierto.png'
            }
            alt={actual.titulo}
            className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
          />
          <div className="image-edge-vignette pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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
        <button
          onClick={anterior}
          aria-label="Concierto anterior"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-olive hover:bg-olive-dark transition-colors w-10 h-10 flex items-center justify-center text-white"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          aria-label="Siguiente concierto"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-olive hover:bg-olive-dark transition-colors w-10 h-10 flex items-center justify-center text-white"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {conciertos.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              const diferencia = i - indice;
              const direccion =
                Math.abs(diferencia) > conciertos.length / 2
                  ? -Math.sign(diferencia)
                  : Math.sign(diferencia);
              cambiarA(i, direccion);
            }}
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
