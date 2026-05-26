import { prisma } from '@/lib/prisma';
import { CategoriesManager } from '@/components/admin/CategoriesManager';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { partners: true } } },
  });

  return (
    <div className="p-6 lg:p-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">⊹ Categorias</p>
        <h1 className="display text-5xl text-ink">
          Gestão de <span className="display-italic text-coral">categorias</span>
        </h1>
        <p className="mt-3 text-ink/60">
          As categorias organizam os parceiros na landing. Cada parceiro pertence a uma.
        </p>
      </div>

      <CategoriesManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          icon: c.icon,
          order: c.order,
          partnersCount: c._count.partners,
        }))}
      />
    </div>
  );
}
