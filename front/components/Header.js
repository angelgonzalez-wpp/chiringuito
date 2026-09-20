import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌵</span>
          <span className="font-display text-lg tracking-wide text-ink">CiD</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-ink">
          <Link href="/" className="hover:text-olive transition-colors">
            Inicio
          </Link>
          <Link href="/conciertos" className="hover:text-olive transition-colors">
            Conciertos
          </Link>
        </nav>

        <Link
          href="#reservas"
          className="border border-ink px-5 py-2 text-sm font-medium tracking-wide hover:bg-ink hover:text-cream transition-colors"
        >
          Reservas
        </Link>
      </div>
    </header>
  );
}
