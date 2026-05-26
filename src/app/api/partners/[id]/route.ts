import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  if (!partner) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
  return NextResponse.json({ partner });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    const fields = [
      'name',
      'description',
      'shortDescription',
      'discount',
      'logoUrl',
      'websiteUrl',
      'couponCode',
      'redemptionInstructions',
      'isActive',
      'isFeatured',
      'categoryId',
    ];
    for (const f of fields) if (f in body) data[f] = body[f];

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data,
      include: { category: true },
    });
    return NextResponse.json({ partner });
  } catch (err) {
    console.error('Erro ao atualizar parceiro:', err);
    return NextResponse.json({ error: 'Erro ao atualizar.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.partner.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Erro ao excluir parceiro:', err);
    return NextResponse.json({ error: 'Erro ao excluir.' }, { status: 500 });
  }
}
