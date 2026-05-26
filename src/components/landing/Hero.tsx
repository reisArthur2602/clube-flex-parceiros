export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20">
      {/* Decorações de fundo */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-forest/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="reveal inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-cream-200/70 backdrop-blur rounded-full border border-ink/10">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-ink/70">
                + de 200 parceiros ativos
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 display text-[clamp(3rem,9vw,8.5rem)] text-ink">
              Descontos
              <br />
              que <span className="display-italic text-coral">merecem</span>
              <br />
              ser contados.
            </h1>

            <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg lg:text-xl text-ink/70 leading-relaxed">
              Um clube curado com os melhores parceiros da cidade —
              gastronomia, saúde, educação, viagens e muito mais. Vantagens
              reais para quem vive bem.
            </p>

            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4">
              <a href="#cta" className="btn-primary text-base">
                Faça parte do clube
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#parceiros" className="btn-secondary text-base">
                Explorar parceiros
              </a>
            </div>
          </div>

          {/* Card lateral com prova social */}
          <div className="reveal reveal-delay-4 lg:col-span-4">
            <div className="relative bg-forest text-cream-50 rounded-3xl p-8 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-3 -right-3 bg-coral text-cream-50 rounded-full w-20 h-20 flex flex-col items-center justify-center transform rotate-12">
                <span className="display text-2xl leading-none">70%</span>
                <span className="text-[10px] uppercase tracking-wider">OFF até</span>
              </div>

              <p className="display-italic text-3xl mb-6 leading-tight">
                &ldquo;Economizei mais de R$ 2.400 em um ano usando o clube.&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-cream-50/20">
                <div className="w-10 h-10 rounded-full bg-cream-200/30 flex items-center justify-center">
                  <span className="text-sm font-medium">MC</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Marina Costa</p>
                  <p className="text-xs text-cream-50/60">Membra desde 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
