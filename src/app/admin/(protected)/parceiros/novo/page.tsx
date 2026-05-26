import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PartnerForm } from '@/components/admin/PartnerForm';

export const dynamic = 'force-dynamic';

export default async function NewPartnerPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
  });

  return (
    <div className="p-6 lg:p-12">
      <Link
        href="/admin/parceiros"
        className="text-sm text-ink/60 hover:text-ink mb-4 inline-flex items-center gap-1"
      >
        ← Voltar para parceiros
      </Link>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">⊹ Novo parceiro</p>
        <h1 className="display text-5xl text-ink">
          Adicionar <span className="display-italic text-coral">parceiro</span>
        </h1>
        <p className="mt-3 text-ink/60">
          Preencha os dados abaixo. O parceiro aparecerá na landing assim que estiver ativo.
        </p>
      </div>

      <PartnerForm
        categories={categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))}
      />
    </div>
  );
}
