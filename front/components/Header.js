'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [enInicio, setEnInicio] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [esMovil, setEsMovil] = useState(false);
  const tieneHeroConHeaderTransparente =
    pathname === '/' || pathname === '/conciertos';

  useEffect(() => {
    const actualizarEstado = () => setEnInicio(window.scrollY <= 10);

    actualizarEstado();
    window.addEventListener('scroll', actualizarEstado, { passive: true });
    return () => window.removeEventListener('scroll', actualizarEstado);
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  const headerTransparente = tieneHeroConHeaderTransparente && enInicio;
  const headerVisibleEnMovil = menuAbierto || (esMovil && !enInicio);
  const logoVisible = esMovil ? headerVisibleEnMovil : !enInicio;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const actualizarVista = () => {
      setEsMovil(mediaQuery.matches);
      if (!mediaQuery.matches) setMenuAbierto(false);
    };

    actualizarVista();
    mediaQuery.addEventListener('change', actualizarVista);
    return () => mediaQuery.removeEventListener('change', actualizarVista);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 header-arial w-full transition-all duration-500 ${
        headerVisibleEnMovil
          ? 'bg-cream/95 backdrop-blur border-b border-black/5'
          : 'bg-transparent border-transparent'
      } ${
        headerTransparente
          ? 'md:bg-transparent md:backdrop-blur-none md:border-transparent'
          : 'md:bg-cream/95 md:backdrop-blur md:border-b md:border-black/5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className={`flex items-center transition-opacity duration-500 ${
            logoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!logoVisible}
          tabIndex={logoVisible ? 0 : -1}
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

        <button
          type="button"
          className={`md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 ${
            menuAbierto || !headerTransparente ? 'text-ink' : 'text-white'
          }`}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="mobile-navigation"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              menuAbierto ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-opacity ${
              menuAbierto ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-transform ${
              menuAbierto ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>

        <Link
          href="#reservas"
          className={`hidden md:block border px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-500 ${
            headerTransparente
              ? 'border-transparent text-white hover:bg-white hover:text-ink'
              : 'border-ink hover:bg-ink hover:text-cream'
          }`}
        >
          RESERVAS
        </Link>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        aria-hidden={!menuAbierto}
        className={`absolute inset-x-0 top-full overflow-hidden bg-cream/95 px-6 text-ink shadow-md backdrop-blur transition-[max-height,opacity] duration-300 md:hidden ${
          menuAbierto ? 'max-h-60 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col py-2 text-sm font-medium">
          <Link
            href="/"
            tabIndex={menuAbierto ? 0 : -1}
            onClick={() => setMenuAbierto(false)}
            className="border-b border-black/10 py-4 hover:text-olive"
          >
            INICIO
          </Link>
          <Link
            href="/conciertos"
            tabIndex={menuAbierto ? 0 : -1}
            onClick={() => setMenuAbierto(false)}
            className="border-b border-black/10 py-4 hover:text-olive"
          >
            CONCIERTOS
          </Link>
          <Link
            href="#reservas"
            tabIndex={menuAbierto ? 0 : -1}
            onClick={() => setMenuAbierto(false)}
            className="py-4 hover:text-olive"
          >
            RESERVAS
          </Link>
        </div>
      </nav>
    </header>
  );
}
