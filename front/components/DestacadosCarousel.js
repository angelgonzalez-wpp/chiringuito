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
  const touchStartXRef = useRef(null);

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

  const iniciarDeslizamiento = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const terminarDeslizamiento = (event) => {
    const inicio = touchStartXRef.current;
    const fin = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;

    if (inicio === null || fin === undefined) return;

    const desplazamiento = fin - inicio;
    if (Math.abs(desplazamiento) < 50) return;

    if (desplazamiento < 0) {
      siguiente();
    } else {
      anterior();
    }
  };

  const actual = conciertos[indice];
  const esGratis = !actual.precio || Number(actual.precio) === 0;

  return (
    <div className="relative max-w-4xl mx-auto">
      <div
        className="group relative aspect-[4/5] w-full touch-pan-y overflow-hidden bg-stone/20 sm:aspect-[16/10] md:aspect-[16/9]"
        onTouchStart={iniciarDeslizamiento}
        onTouchEnd={terminarDeslizamiento}
        onTouchCancel={() => {
          touchStartXRef.current = null;
        }}
      >
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

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6 md:p-8">
            <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
              {actual.generos
                ?.split(',')
                .slice(0, 2)
                .map((g) => (
                  <span
                    key={g}
                    className="bg-gold px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs"
                  >
                    {g.trim().toUpperCase()}
                  </span>
                ))}
              <span className="bg-olive px-2 py-1 text-[10px] font-semibold text-white sm:px-3 sm:text-xs">
                ★ DESTACADO
              </span>
            </div>

            <h3 className="mb-2 font-display text-2xl sm:text-3xl md:text-4xl">{actual.titulo}</h3>
            {actual.descripcion ? (
              <p className="mb-3 line-clamp-2 max-w-xl text-sm text-white/80 sm:mb-4 sm:text-base">
                {actual.descripcion}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:gap-4 sm:text-sm">
              <span>📅 {formatearFecha(actual.fecha)}</span>
              <span>🕒 {actual.hora?.slice(0, 5)}h</span>
              <span className="bg-gold px-2 py-1 text-[10px] font-semibold text-ink sm:px-3 sm:text-xs">
                {esGratis ? 'GRATIS' : `${Number(actual.precio).toFixed(0)} €`}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={anterior}
          aria-label="Concierto anterior"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-olive text-xl text-white transition-colors hover:bg-olive-dark sm:left-4 sm:h-10 sm:w-10"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          aria-label="Siguiente concierto"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-olive text-xl text-white transition-colors hover:bg-olive-dark sm:right-4 sm:h-10 sm:w-10"
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
