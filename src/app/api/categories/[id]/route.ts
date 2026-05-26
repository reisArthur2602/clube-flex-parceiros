import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if ('name' in body) data.name = body.name;
    if ('icon' in body) data.icon = body.icon;
    if ('order' in body) data.order = body.order;

    const category = await prisma.category.update({ where: { id: params.id }, data });
    return NextResponse.json({ category });
  } catch (err) {
    console.error('Erro ao atualizar categoria:', err);
    return NextResponse.json({ error: 'Erro ao atualizar.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const count = await prisma.partner.count({ where: { categoryId: params.id } });
    if (count > 0) {
      return NextResponse.json(
        { error: `Não é possível excluir: ${count} parceiro(s) vinculado(s).` },
        { status: 400 }
      );
    }
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Erro ao excluir categoria:', err);
    return NextResponse.json({ error: 'Erro ao excluir.' }, { status: 500 });
  }
}
