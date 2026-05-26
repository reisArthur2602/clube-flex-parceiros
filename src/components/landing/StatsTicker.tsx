export function StatsTicker() {
  const items = [
    { value: '200+', label: 'parceiros' },
    { value: 'Até 70%', label: 'de desconto' },
    { value: '50 mil', label: 'membros ativos' },
    { value: '8', label: 'categorias' },
    { value: 'R$ 12M', label: 'economizados em 2024' },
    { value: '4.9★', label: 'avaliação média' },
  ];
  // Duplicado para loop infinito
  const all = [...items, ...items, ...items];

  return (
    <section className="bg-ink text-cream-50 py-8 overflow-hidden border-y border-cream-50/10">
      <div className="marquee-track">
        {all.map((item, i) => (
          <div key={i} className="flex items-baseline gap-4 whitespace-nowrap">
            <span className="display text-4xl md:text-5xl">{item.value}</span>
            <span className="text-sm uppercase tracking-widest text-cream-50/60">
              {item.label}
            </span>
            <span className="display-italic text-coral text-3xl ml-8">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
