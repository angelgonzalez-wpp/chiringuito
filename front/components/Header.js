'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [enInicio, setEnInicio] = useState(true);
  const esPortada = pathname === '/';

  useEffect(() => {
    const actualizarEstado = () => setEnInicio(window.scrollY <= 10);

    actualizarEstado();
    window.addEventListener('scroll', actualizarEstado, { passive: true });
    return () => window.removeEventListener('scroll', actualizarEstado);
  }, []);

  const headerTransparente = esPortada && enInicio;

  return (
    <header
      className={`fixed top-0 z-50 header-arial w-full transition-all duration-500 ${
        headerTransparente
          ? 'bg-transparent border-transparent'
          : 'bg-cream/95 backdrop-blur border-b border-black/5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className={`flex items-center transition-opacity duration-500 ${
            headerTransparente ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden={headerTransparente}
          tabIndex={headerTransparente ? -1 : 0}
        >
          <Image
            src="/images/ElCIdLogo.png"
            alt="El CiD — La buena vida"
            width={82.21}
            height={56}
            priority
            className="h-[56px] w-[82.21px] object-contain"
          />
        </Link>

        <nav
          className={`hidden md:flex items-center gap-10 text-sm font-medium transition-colors duration-500 ${
            headerTransparente ? 'text-white' : 'text-ink'
          }`}
        >
          <Link
            href="/"
            className={headerTransparente ? 'hover:text-white/70' : 'hover:text-olive transition-colors'}
          >
            INICIO
          </Link>
          <Link
            href="/conciertos"
            className={headerTransparente ? 'hover:text-white/70' : 'hover:text-olive transition-colors'}
          >
            CONCIERTOS
          </Link>
        </nav>

        <Link
          href="#reservas"
          className={`border px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-500 ${
            headerTransparente
              ? 'border-transparent text-white hover:bg-white hover:text-ink'
              : 'border-ink hover:bg-ink hover:text-cream'
          }`}
        >
          RESERVAS
        </Link>
      </div>
    </header>
  );
}


