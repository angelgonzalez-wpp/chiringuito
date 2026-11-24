import Image from 'next/image';

const FEATURES = [
  { icon: '/icons/playa.png', label: 'Terraza en la playa' },
  { icon: '/icons/comida.png', label: 'Cocina mediterránea' },
  { icon: '/icons/cerveza.png', label: 'Cañero siempre frío' },
  { icon: '/icons/musica.png', label: 'Música en directo' }
];

export default function FeatureBar() {
  return (
    <section className="bg-olive text-white" data-feature-bar>
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {FEATURES.map(({ icon, label }) => (
          <div
            key={label}
            data-feature-item
            className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center"
          >
            <Image src={icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="text-xs tracking-wide font-medium">{label.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
