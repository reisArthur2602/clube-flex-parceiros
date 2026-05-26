import Link from 'next/link';

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1 group">
          <span className="display text-2xl text-ink">Vantagem</span>
          <span className="display-italic text-2xl text-coral">+</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm">
          <a href="#parceiros" className="text-ink/70 hover:text-ink transition-colors">
            Parceiros
          </a>
          <a href="#beneficios" className="text-ink/70 hover:text-ink transition-colors">
            Benefícios
          </a>
          <a href="#como-funciona" className="text-ink/70 hover:text-ink transition-colors">
            Como funciona
          </a>
          <a href="#faq" className="text-ink/70 hover:text-ink transition-colors">
            FAQ
          </a>
        </div>

        <a href="#cta" className="btn-primary text-sm py-2.5 px-5">
          Quero participar
        </a>
      </nav>
    </header>
  );
}
