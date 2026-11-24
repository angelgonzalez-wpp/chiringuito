import ButtonLink from '@/components/ui/ButtonLink';
import ParallaxImage from './ParallaxImage';

export default function MusicBanner() {
  return (
    <section
      className="relative overflow-hidden py-32 px-6 text-center text-white"
      data-scroll-section
    >
      <ParallaxImage
        src="/images/MultitudEnUnConcierto.png"
        alt="Multitud en un concierto"
        overscan="lg"
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
        <ButtonLink href="/conciertos" variant="gold" className="inline-block">
          VER PRÓXIMOS CONCIERTOS
        </ButtonLink>
      </div>
    </section>
  );
}
