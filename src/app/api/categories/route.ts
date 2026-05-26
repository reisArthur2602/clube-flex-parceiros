import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { partners: true } } },
  });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '').trim();
    if (!name) return NextResponse.json({ error: 'Nome obrigatório.' }, { status: 400 });

    const category = await prisma.category.create({
      data: {
        name,
        slug: slugify(name),
        icon: body.icon || null,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    console.error('Erro ao criar categoria:', err);
    return NextResponse.json({ error: 'Erro ao criar categoria.' }, { status: 500 });
  }
}
