'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });

      heroTimeline
        .from('[data-hero-eyebrow]', {
          y: 24,
          autoAlpha: 0,
          duration: 0.9
        })
        .from(
          '[data-hero-title]',
          {
            y: 32,
            autoAlpha: 0,
            duration: 0.9
          },
          '-=0.2'
        )
        .from(
          '[data-hero-subtitle]',
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.2
          },
          '-=0.2'
        )
        .from(
          '[data-hero-actions]',
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.5
          },
          '-=0.15'
        );

      gsap.from('[data-feature-item]', {
        y: 25,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-feature-bar]',
          start: 'top 85%',
          once: true
        }
      });

      gsap.utils.toArray('[data-parallax]').forEach((image) => {
        gsap.fromTo(image, { yPercent: -18 }, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: image.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      });

      gsap.utils.toArray('[data-scroll-section]').forEach((section) => {
        gsap.from(section.querySelectorAll('[data-scroll-item]'), {
          y: 45,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true
          }
        });
      });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef}>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/PlayaDelMediterraneoEnMojacar.png"
          alt="Playa del Mediterráneo en Mojácar"
          className="absolute inset-x-0 top-[-36%] h-[180%] w-full object-cover scale-[1.2]"
          data-parallax
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 px-6">
          <p className="eyebrow text-white/80 mb-4" data-hero-eyebrow>
            MOJÁCAR PLAYA, ALMERÍA
          </p>
          <h1 className="font-display text-6xl md:text-8xl mb-2" data-hero-title>
            El CiD
          </h1>
          <p className="font-display italic text-xl md:text-2xl mb-8" data-hero-title>
            la buena vida
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-hero-actions>
            <a
              href="/conciertos"
              className="bg-olive hover:bg-olive-dark transition-colors px-7 py-3 text-sm font-medium tracking-wide"
            >
              PRÓXIMOS CONCIERTOS
            </a>
            <a
              href="#reservas"
              className="border border-white/70 hover:bg-white hover:text-ink transition-colors px-7 py-3 text-sm font-medium tracking-wide"
            >
              RESERVAS
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-cream py-16 px-6 text-center" data-scroll-section>
        <p className="font-display italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-stone" data-scroll-item>
          En la orilla del Mediterráneo, donde la arena cede paso al mar, nació
          El CiD. Un lugar donde el tiempo se detiene, la comida sabe a
          Almería y la música llena el alma. Bienvenido a <em>la buena vida</em>.
        </p>
      </section>

      {/* FEATURE BAR */}
      <section className="bg-olive text-white" data-feature-bar>
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { icon: '/icons/playa.png', label: 'Terraza en la playa' },
            { icon: '/icons/comida.png', label: 'Cocina mediterránea' },
            { icon: '/icons/cerveza.png', label: 'Cañero siempre frío' },
            { icon: '/icons/musica.png', label: 'Música en directo' }
          ].map((item) => (
            <div
              key={item.label}
              data-feature-item
              className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center"
            >
              <Image
                src={item.icon}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xs tracking-wide font-medium">{item.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LA PLAYA */}
      <section className="bg-cream py-24 px-6" data-scroll-section>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1" data-scroll-item>
            <p className="eyebrow text-olive mb-3">LA PLAYA</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              El Mediterráneo,
              <br />
              <em className="italic">a tus pies</em>
            </h2>
            <p className="text-stone leading-relaxed mb-4 max-w-md">
              Mojácar Playa es uno de los rincones más bellos de Andalucía.
              Agua cristalina, cielos despejados casi todo el año y una luz
              que convierte cada atardecer en una obra de arte. En El CiD
              tenemos la mejor terraza con vistas directas al mar.
            </p>
            <p className="text-stone leading-relaxed max-w-md">
              Ven a disfrutar de la calma del Mediterráneo, con los pies en
              la arena y una bebida fría en la mano. Así es la buena vida.
            </p>
          </div>
          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2" data-scroll-item>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/costaMediterranea.png"
              alt="Costa mediterránea con vegetación"
              className="absolute inset-x-0 top-[-36%] h-[180%] w-full object-cover scale-[1.4]"
              data-parallax
            />
          </div>
        </div>
      </section>

      {/* NUESTRA COCINA */}
      <section className="bg-sand py-24 px-6" data-scroll-section>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden" data-scroll-item>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Paellero.png"
              alt="Preparación de paella"
              className="absolute inset-x-0 top-[-36%] h-[180%] w-full object-cover scale-[1.4]"
              data-parallax
            />
          </div>
          <div data-scroll-item>
            <p className="eyebrow text-olive mb-3">NUESTRA COCINA</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Paellas que saben
              <br />
              <em className="italic">a mar y sol</em>
            </h2>
            <p className="text-stone leading-relaxed mb-4 max-w-md">
              En El CiD elaboramos nuestras paellas con productos frescos de
              la huerta almeriense y el mejor marisco de la costa. Cada arroz
              es una celebración de los sabores del Mediterráneo.
            </p>
            <p className="text-stone leading-relaxed mb-8 max-w-md">
              Las paellas se preparan al momento, con el cariño y la
              tradición que se merece un plato así. También ofrecemos una
              completa carta de tapas, pescados a la plancha y postres
              caseros.
            </p>
            <a
              href="#reservas"
              className="inline-block bg-olive hover:bg-olive-dark transition-colors text-white px-7 py-3 text-sm font-medium tracking-wide"
            >
              RESERVAR MESA
            </a>
          </div>
        </div>
      </section>

      {/* EL CAÑERO */}
      <section className="bg-ink text-cream py-24 px-6" data-scroll-section>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div data-scroll-item>
            <p className="eyebrow text-gold mb-3">EL CAÑERO</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              La cerveza más fría
              <br />
              <em className="italic text-gold">de Almería</em>
            </h2>
            <p className="text-cream/70 leading-relaxed mb-4 max-w-md">
              Nuestro sistema de cañero garantiza que cada cerveza llegue a
              la mano a la temperatura perfecta — recién salida del frío, con
              ese punto de escarcha que hace que el primer sorbo sea
              perfección pura.
            </p>
            <p className="text-cream/70 leading-relaxed mb-10 max-w-md">
              Además de cerveza de grifo, disponemos de una amplia selección
              de vinos de la tierra, cócteles de temporada, refrescos y la
              mejor sangría de Mojácar.
            </p>

            <div className="flex gap-10">
              <div>
                <p className="font-display text-3xl text-gold">4°</p>
                <p className="text-xs text-cream/60 tracking-wide mt-1">TEMPERATURA IDEAL</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">500ml</p>
                <p className="text-xs text-cream/60 tracking-wide mt-1">EL CAÑERO PERFECTO</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden" data-scroll-item>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/CervezaFriaCondesacion.png"
              alt="Cerveza fría con condensación"
              className="absolute inset-x-0 top-[-36%] h-[180%] w-full object-cover scale-[1.4]"
              data-parallax
            />
          </div>
        </div>
      </section>

      {/* MÚSICA EN DIRECTO (banner) */}
      <section className="relative overflow-hidden py-32 px-6 text-center text-white" data-scroll-section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/MultitudEnUnConcierto.png"
          alt="Multitud en un concierto"
          className="absolute inset-x-0 top-[-36%] h-[180%] w-full object-cover "
          data-parallax
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-2xl mx-auto" data-scroll-item>
          <p className="eyebrow text-gold mb-4">MÚSICA EN DIRECTO</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            La noche empieza
            <br />
            <em className="italic">aquí</em>
          </h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Cada semana, los mejores grupos de la escena nacional e
            internacional llenan El CiD de música. Flamenco, rock, jazz,
            reggae, soul... Hay vida más allá del atardecer.
          </p>
          <a
            href="/conciertos"
            className="inline-block bg-gold hover:bg-gold-dark transition-colors text-ink px-7 py-3 text-sm font-medium tracking-wide"
          >
            VER PRÓXIMOS CONCIERTOS
          </a>
        </div>
      </section>

      {/* RESERVAS */}
      <section id="reservas" className="bg-cream py-24 px-6 text-center" data-scroll-section>
        <div data-scroll-item>
        <p className="eyebrow text-olive mb-3">RESERVAS</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">¿Vienes a vernos?</h2>
        <p className="text-stone max-w-lg mx-auto leading-relaxed mb-8">
          Para reservar mesa o para grupos, llámanos o escríbenos. Estaremos
          encantados de prepararlo todo para que tu visita sea perfecta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+34950000000"
            className="bg-olive hover:bg-olive-dark transition-colors text-white px-7 py-3 text-sm font-medium tracking-wide"
          >
            +34 950 000 000
          </a>
          <a
            href="mailto:reservas@elcid.com"
            className="border border-ink px-7 py-3 text-sm font-medium tracking-wide hover:bg-ink hover:text-cream transition-colors"
          >
            RESERVA
          </a>
        </div>
        </div>
      </section>
    </main>
  );
}
