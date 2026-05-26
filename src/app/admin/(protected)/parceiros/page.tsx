import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PartnersTable } from '@/components/admin/PartnersTable';

export const dynamic = 'force-dynamic';

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    include: { category: true },
    orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
  });

  return (
    <div className="p-6 lg:p-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">⊹ Parceiros</p>
          <h1 className="display text-5xl text-ink">
            Lista de <span className="display-italic text-coral">parceiros</span>
          </h1>
          <p className="mt-2 text-ink/60">
            {partners.length} parceiros cadastrados no clube.
          </p>
        </div>
        <Link href="/admin/parceiros/novo" className="btn-primary">
          + Adicionar parceiro
        </Link>
      </div>

      <PartnersTable
        partners={partners.map((p) => ({
          id: p.id,
          name: p.name,
          discount: p.discount,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          categoryName: p.category.name,
          categoryIcon: p.category.icon,
        }))}
      />
    </div>
  );
}
