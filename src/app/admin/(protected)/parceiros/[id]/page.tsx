import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PartnerForm } from '@/components/admin/PartnerForm';

export const dynamic = 'force-dynamic';

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const [partner, categories] = await Promise.all([
    prisma.partner.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
  ]);

  if (!partner) notFound();

  return (
    <div className="p-6 lg:p-12">
      <Link
        href="/admin/parceiros"
        className="text-sm text-ink/60 hover:text-ink mb-4 inline-flex items-center gap-1"
      >
        ← Voltar para parceiros
      </Link>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">⊹ Editar parceiro</p>
        <h1 className="display text-5xl text-ink">{partner.name}</h1>
      </div>

      <PartnerForm
        categories={categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))}
        partner={{
          id: partner.id,
          name: partner.name,
          description: partner.description,
          shortDescription: partner.shortDescription,
          discount: partner.discount,
          logoUrl: partner.logoUrl,
          websiteUrl: partner.websiteUrl,
          couponCode: partner.couponCode,
          redemptionInstructions: partner.redemptionInstructions,
          isActive: partner.isActive,
          isFeatured: partner.isFeatured,
          categoryId: partner.categoryId,
        }}
      />
    </div>
  );
}
