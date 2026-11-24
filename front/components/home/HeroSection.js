import ButtonLink from '@/components/ui/ButtonLink';
import ParallaxImage from './ParallaxImage';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center text-center text-white">
      <ParallaxImage
        src="/images/PlayaDelMediterraneoEnMojacar.png"
        alt="Playa del Mediterráneo en Mojácar"
        overscan="lg"
        imageClassName="scale-[1.2]"
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
          <ButtonLink href="/conciertos">PRÓXIMOS CONCIERTOS</ButtonLink>
          <ButtonLink href="#reservas" variant="outlineLight">
            RESERVAS
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
