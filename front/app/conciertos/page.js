import Image from 'next/image';
import DestacadosCarousel from '@/components/DestacadosCarousel';
import ConciertoCard from '@/components/ConciertoCard';

const API_URL = process.env.API_URL || 'http://localhost:3000';

async function getConciertos() {
  try {
    const res = await fetch(`${API_URL}/api/conciertos`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('No se pudo conectar con el backend:', error.message);
    return [];
  }
}

async function getDestacados() {
  try {
    const res = await fetch(`${API_URL}/api/conciertos/destacados`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('No se pudo conectar con el backend:', error.message);
    return [];
  }
}

export default async function ConciertosPage() {
  const [conciertos, destacados] = await Promise.all([
    getConciertos(),
    getDestacados()
  ]);

  const hayDestacados = destacados.length > 0;

  return (
    <main>
      {/* HERO */}
      <section className="relative py-28 px-6 text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80"
          alt="Multitud en un concierto"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="eyebrow text-gold mb-4">AGENDA MUSICAL</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6">Conciertos</h1>
          <p className="text-white/80 leading-relaxed">
            Los mejores grupos y artistas del panorama nacional e
            internacional, junto al Mediterráneo. Verano 2026 en El CiD.
          </p>
        </div>
      </section>

      {/* DESTACADOS: solo se renderiza si hay al menos uno */}
      {hayDestacados ? (
        <section className="bg-ink text-cream py-20 px-6">
          <p className="eyebrow text-gold text-center mb-3">★ DESTACADOS</p>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
            Los Mejores Conciertos del Verano
          </h2>
          <DestacadosCarousel conciertos={destacados} />
        </section>
      ) : null}

      {/* PRÓXIMOS EVENTOS */}
      <section className="bg-cream py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl mb-10">🎵 Próximos Eventos</h2>

          {conciertos.length === 0 ? (
            <p className="text-stone">
              No hay conciertos programados por ahora. ¡Vuelve pronto!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {conciertos.map((concierto) => (
                <ConciertoCard key={concierto.id} concierto={concierto} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-olive text-white py-16 px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl mb-3">
          No te pierdas ningún concierto
        </h2>
        <p className="text-white/80 mb-8">
          Síguenos en redes sociales o escríbenos para recibir la agenda en tu correo.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 px-4 py-3 text-ink placeholder:text-stone/60 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gold hover:bg-gold-dark transition-colors text-ink px-6 py-3 text-sm font-semibold tracking-wide"
          >
            SUSCRIBIRSE
          </button>
        </form>
      </section>
    </main>
  );
}
