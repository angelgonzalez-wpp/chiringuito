import ParallaxImage from './ParallaxImage';

const themes = {
  light: {
    section: 'bg-cream',
    eyebrow: 'text-olive',
    accent: '',
    paragraph: 'text-stone'
  },
  sand: {
    section: 'bg-sand',
    eyebrow: 'text-olive',
    accent: '',
    paragraph: 'text-stone'
  },
  dark: {
    section: 'bg-ink text-cream',
    eyebrow: 'text-gold',
    accent: 'text-gold',
    paragraph: 'text-cream/70'
  }
};

// En móvil la imagen siempre va encima del texto; en escritorio
// `imageSide` decide en qué columna se coloca.
const sideClasses = {
  left: { image: 'md:order-1', text: 'md:order-2' },
  right: { image: 'md:order-2', text: 'md:order-1' }
};

const margenUltimoParrafo = (hayExtra, hayCta) => {
  if (hayExtra) return 'mb-10';
  if (hayCta) return 'mb-8';
  return '';
};

export default function FeatureSplit({
  theme = 'light',
  imageSide = 'right',
  aspect = 'aspect-[4/5]',
  image,
  eyebrow,
  title,
  accent,
  paragraphs,
  cta,
  children
}) {
  const colors = themes[theme];
  const side = sideClasses[imageSide];
  const margenFinal = margenUltimoParrafo(Boolean(children), Boolean(cta));

  return (
    <section className={`${colors.section} py-24 px-6`} data-scroll-section>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`relative order-1 ${aspect} w-full overflow-hidden ${side.image}`}
          data-scroll-item
        >
          <ParallaxImage sizes="(max-width: 768px) 100vw, 50vw" quality={90} {...image} />
        </div>

        <div className={`order-2 ${side.text}`} data-scroll-item>
          <p className={`eyebrow ${colors.eyebrow} mb-3`}>{eyebrow}</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
            {title}
            <br />
            <em className={`italic ${colors.accent}`.trim()}>{accent}</em>
          </h2>

          {paragraphs.map((texto, i) => (
            <p
              key={texto}
              className={`${colors.paragraph} leading-relaxed max-w-md ${
                i === paragraphs.length - 1 ? margenFinal : 'mb-4'
              }`.trim()}
            >
              {texto}
            </p>
          ))}

          {children}
          {cta}
        </div>
      </div>
    </section>
  );
}
