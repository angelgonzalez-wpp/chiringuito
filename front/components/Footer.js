export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌵</span>
            <span className="font-display text-lg text-cream">CiD</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Tu chiringuito de referencia en Mojácar Playa. Comidas, paellas,
            buena música y la mejor cerveza fría.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-gold mb-4">HORARIOS</h4>
          <ul className="text-sm space-y-1.5">
            <li>Lunes — Jueves: 10:00 – 24:00</li>
            <li>Viernes — Sábado: 10:00 – 02:00</li>
            <li>Domingo: 10:00 – 24:00</li>
          </ul>
          <p className="text-gold text-sm mt-3">Abierto todo el año</p>
        </div>

        <div>
          <h4 className="eyebrow text-gold mb-4">CONTACTO</h4>
          <ul className="text-sm space-y-2">
            <li>Paseo del Mediterráneo s/n, Mojácar Playa, Almería</li>
            <li>+34 950 000 000</li>
          </ul>
          <div className="flex gap-4 mt-4 text-lg">
            <span>📷</span>
            <span>👍</span>
            <span>🎵</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-cream/50">
        © 2026 El CiD — La Buena Vida · Mojácar Playa, Almería
      </div>
    </footer>
  );
}
