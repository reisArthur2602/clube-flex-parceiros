const benefits = [
  {
    number: '01',
    title: 'Parceiros curados',
    body: 'Cada estabelecimento passa por uma curadoria criteriosa. Aqui só entram marcas que entregam qualidade real.',
  },
  {
    number: '02',
    title: 'Descontos de verdade',
    body: 'Vantagens negociadas diretamente — sem letras miúdas, sem pegadinhas. O preço final é o que está no anúncio.',
  },
  {
    number: '03',
    title: 'Sem complicação',
    body: 'Apresente o código ou seu cartão de membro. O processo é simples e funciona em qualquer dispositivo.',
  },
  {
    number: '04',
    title: 'Atualizado todo mês',
    body: 'Novos parceiros entram constantemente. Sua carteira de vantagens só cresce com o tempo.',
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
              ⊹ Por que entrar
            </p>
            <h2 className="display text-5xl lg:text-7xl text-ink leading-[0.95]">
              Mais que descontos.
              <br />
              <span className="display-italic text-forest">Uma rotina mais</span>
              <br />
              generosa.
            </h2>
            <p className="mt-8 text-lg text-ink/70 max-w-md">
              O Vantagem+ foi construído para quem entende que pequenas economias,
              feitas todo dia, geram grandes diferenças no fim do mês.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10">
              {benefits.map((b) => (
                <div
                  key={b.number}
                  className="bg-cream-100 p-8 lg:p-10 group hover:bg-cream-50 transition-colors"
                >
                  <span className="display-italic text-3xl text-coral block mb-6">
                    {b.number}
                  </span>
                  <h3 className="display text-2xl lg:text-3xl mb-3 text-ink">
                    {b.title}
                  </h3>
                  <p className="text-ink/70 leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
