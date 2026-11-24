const base = 'px-7 py-3 text-sm font-medium tracking-wide transition-colors';

const variants = {
  olive: 'bg-olive hover:bg-olive-dark text-white',
  gold: 'bg-gold hover:bg-gold-dark text-ink',
  outlineLight: 'border border-white/70 hover:bg-white hover:text-ink',
  outlineDark: 'border border-ink hover:bg-ink hover:text-cream'
};

export default function ButtonLink({ href, variant = 'olive', className = '', children }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`.trim()}>
      {children}
    </a>
  );
}
