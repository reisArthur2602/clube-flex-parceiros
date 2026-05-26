import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeInactive = searchParams.get('includeInactive') === 'true';
  const session = await getSession();

  const where = includeInactive && session ? {} : { isActive: true };

  const partners = await prisma.partner.findMany({
    where,
    include: { category: true },
    orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
  });
  return NextResponse.json({ partners });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '').trim();
    const description = String(body?.description ?? '').trim();
    const discount = String(body?.discount ?? '').trim();
    const categoryId = String(body?.categoryId ?? '').trim();

    if (!name || !description || !discount || !categoryId) {
      return NextResponse.json(
        { error: 'Nome, descrição, desconto e categoria são obrigatórios.' },
        { status: 400 }
      );
    }

    let slug = slugify(name);
    const exists = await prisma.partner.findUnique({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;

    const partner = await prisma.partner.create({
      data: {
        name,
        slug,
        description,
        shortDescription: body.shortDescription || null,
        discount,
        logoUrl: body.logoUrl || null,
        websiteUrl: body.websiteUrl || null,
        couponCode: body.couponCode || null,
        redemptionInstructions: body.redemptionInstructions || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json({ partner }, { status: 201 });
  } catch (err) {
    console.error('Erro ao criar parceiro:', err);
    return NextResponse.json({ error: 'Erro ao criar parceiro.' }, { status: 500 });
  }
}
