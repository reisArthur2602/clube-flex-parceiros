export function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Cadastre-se',
      body: 'Faça parte do clube em menos de 2 minutos. Sem burocracia.',
    },
    {
      step: '2',
      title: 'Explore parceiros',
      body: 'Navegue pelo catálogo, filtre por categoria, encontre o que precisa.',
    },
    {
      step: '3',
      title: 'Use seu desconto',
      body: 'Apresente o cupom no estabelecimento ou aplique no checkout online.',
    },
    {
      step: '4',
      title: 'Economize sempre',
      body: 'Acompanhe quanto você já economizou no seu painel pessoal.',
    },
  ];

  return (
    <section id="como-funciona" className="bg-cream-200/50 py-24 lg:py-32 border-y border-ink/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            ⊹ Como funciona
          </p>
          <h2 className="display text-5xl lg:text-7xl text-ink">
            Em <span className="display-italic text-coral">quatro</span> passos.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-ink/20" />
              )}
              <div className="bg-cream-50 rounded-2xl p-8 h-full border border-ink/5">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="display text-6xl text-forest">{s.step}</span>
                  <span className="display-italic text-2xl text-coral">/04</span>
                </div>
                <h3 className="display text-2xl mb-3 text-ink">{s.title}</h3>
                <p className="text-ink/70 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
