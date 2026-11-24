export default function LoadingState({
  message = 'Cargando...',
  hint = 'El servidor puede tardar hasta un minuto en despertar. Gracias por la espera.',
  className = 'py-24'
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 px-6 text-center ${className}`}
    >
      <span
        className="h-10 w-10 animate-spin rounded-full border-4 border-olive/20 border-t-olive"
        aria-hidden="true"
      />
      <p className="font-display text-xl">{message}</p>
      {hint ? <p className="max-w-sm text-sm text-stone">{hint}</p> : null}
    </div>
  );
}
