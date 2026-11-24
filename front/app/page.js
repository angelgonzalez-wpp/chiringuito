import ButtonLink from '@/components/ui/ButtonLink';
import HomeAnimations from '@/components/home/HomeAnimations';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import FeatureBar from '@/components/home/FeatureBar';
import FeatureSplit from '@/components/home/FeatureSplit';
import MusicBanner from '@/components/home/MusicBanner';
import ReservasSection from '@/components/home/ReservasSection';

export default function HomePage() {
  return (
    <HomeAnimations>
      <HeroSection />
      <IntroSection />
      <FeatureBar />

      <FeatureSplit
        theme="light"
        imageSide="right"
        image={{
          src: '/images/costaMediterranea.png',
          alt: 'Costa mediterránea con vegetación'
        }}
        eyebrow="LA PLAYA"
        title="El Mediterráneo,"
        accent="a tus pies"
        paragraphs={[
          'Mojácar Playa es uno de los rincones más bellos de Andalucía. Agua cristalina, cielos despejados casi todo el año y una luz que convierte cada atardecer en una obra de arte. En El CiD tenemos la mejor terraza con vistas directas al mar.',
          'Ven a disfrutar de la calma del Mediterráneo, con los pies en la arena y una bebida fría en la mano. Así es la buena vida.'
        ]}
      />

      <FeatureSplit
        theme="sand"
        imageSide="left"
        aspect="aspect-[4/3]"
        image={{ src: '/images/Paellero.png', alt: 'Preparación de paella' }}
        eyebrow="NUESTRA COCINA"
        title="Paellas que saben"
        accent="a mar y sol"
        paragraphs={[
          'En El CiD elaboramos nuestras paellas con productos frescos de la huerta almeriense y el mejor marisco de la costa. Cada arroz es una celebración de los sabores del Mediterráneo.',
          'Las paellas se preparan al momento, con el cariño y la tradición que se merece un plato así. También ofrecemos una completa carta de tapas, pescados a la plancha y postres caseros.'
        ]}
        cta={
          <ButtonLink href="#reservas" className="inline-block">
            RESERVAR MESA
          </ButtonLink>
        }
      />

      <FeatureSplit
        theme="dark"
        imageSide="right"
        image={{
          src: '/images/CervezaFriaCondesacion.png',
          alt: 'Cerveza fría con condensación'
        }}
        eyebrow="EL CAÑERO"
        title="La cerveza más fría"
        accent="de Almería"
        paragraphs={[
          'Nuestro sistema de cañero garantiza que cada cerveza llegue a la mano a la temperatura perfecta — recién salida del frío, con ese punto de escarcha que hace que el primer sorbo sea perfección pura.',
          'Además de cerveza de grifo, disponemos de una amplia selección de vinos de la tierra, cócteles de temporada, refrescos y la mejor sangría de Mojácar.'
        ]}
      >
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
      </FeatureSplit>

      <MusicBanner />
      <ReservasSection />
    </HomeAnimations>
  );
}
