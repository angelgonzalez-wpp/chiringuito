import Image from 'next/image';

// Contenedor más alto que su sección: HomeAnimations lo desplaza con
// [data-parallax] sin dejar huecos en los bordes. `overscan` controla ese margen.
const overscanClasses = {
  sm: 'top-[-10%] h-[120%]',
  lg: 'top-[-36%] h-[180%]'
};

export default function ParallaxImage({
  src,
  alt,
  sizes = '100vw',
  quality,
  overscan = 'sm',
  imageClassName = ''
}) {
  return (
    <div className={`absolute inset-x-0 ${overscanClasses[overscan]}`} data-parallax>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className={`object-cover ${imageClassName}`.trim()}
      />
    </div>
  );
}
