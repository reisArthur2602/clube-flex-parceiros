import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalPartners, activePartners, featuredPartners, totalCategories, recentPartners] =
    await Promise.all([
      prisma.partner.count(),
      prisma.partner.count({ where: { isActive: true } }),
      prisma.partner.count({ where: { isFeatured: true } }),
      prisma.category.count(),
      prisma.partner.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

  const stats = [
    { label: 'Parceiros no total', value: totalPartners },
    { label: 'Parceiros ativos', value: activePartners },
    { label: 'Em destaque', value: featuredPartners },
    { label: 'Categorias', value: totalCategories },
  ];

  return (
    <div className="p-6 lg:p-12 max-w-6xl">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">⊹ Visão geral</p>
        <h1 className="display text-5xl text-ink">
          Olá, <span className="display-italic text-coral">Supervisora</span>.
        </h1>
        <p className="mt-3 text-ink/60 text-lg">
          Aqui você acompanha e gerencia tudo o que aparece no clube.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-cream-50 border border-ink/5 rounded-2xl p-6"
          >
            <p className="text-xs uppercase tracking-widest text-ink/40 mb-2">{s.label}</p>
            <p className="display text-5xl text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <Link
          href="/admin/parceiros/novo"
          className="group bg-ink text-cream-50 rounded-3xl p-8 flex items-center justify-between hover:bg-forest transition-colors"
        >
          <div>
            <p className="display text-3xl mb-1">Adicionar parceiro</p>
            <p className="text-cream-50/60 text-sm">Cadastre um novo estabelecimento.</p>
          </div>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        <Link
          href="/admin/parceiros"
          className="group bg-cream-50 border border-ink/10 rounded-3xl p-8 flex items-center justify-between hover:border-ink/30 transition-all"
        >
          <div>
            <p className="display text-3xl mb-1 text-ink">Gerenciar parceiros</p>
            <p className="text-ink/60 text-sm">Edite, ative ou remova parceiros.</p>
          </div>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      {/* Recentes */}
      <div>
        <h2 className="display text-3xl text-ink mb-6">Adicionados recentemente</h2>
        {recentPartners.length === 0 ? (
          <p className="text-ink/60">Nenhum parceiro cadastrado ainda.</p>
        ) : (
          <div className="bg-cream-50 border border-ink/5 rounded-2xl overflow-hidden">
            {recentPartners.map((p, i) => (
              <Link
                key={p.id}
                href={`/admin/parceiros/${p.id}`}
                className={`flex items-center justify-between p-5 hover:bg-cream-100 transition-colors ${
                  i > 0 ? 'border-t border-ink/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{p.category.icon || '✦'}</span>
                  <div>
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="text-sm text-ink/50">
                      {p.category.name} · {formatDate(p.createdAt)}
                    </p>
                  </div>
                </div>
                <span className="display-italic text-forest text-xl">{p.discount}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
