import ButtonLink from '@/components/ui/ButtonLink';

export default function ReservasSection() {
  return (
    <section id="reservas" className="bg-cream py-24 px-6 text-center" data-scroll-section>
      <div data-scroll-item>
        <p className="eyebrow text-olive mb-3">RESERVAS</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">¿Vienes a vernos?</h2>
        <p className="text-stone max-w-lg mx-auto leading-relaxed mb-8">
          Para reservar mesa o para grupos, llámanos o escríbenos. Estaremos
          encantados de prepararlo todo para que tu visita sea perfecta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="tel:+34950000000">+34 950 000 000</ButtonLink>
          <ButtonLink href="mailto:reservas@elcid.com" variant="outlineDark">
            RESERVA
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
