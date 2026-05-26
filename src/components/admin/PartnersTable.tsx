'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PartnerRow {
  id: string;
  name: string;
  discount: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryName: string;
  categoryIcon: string | null;
}

export function PartnersTable({ partners }: { partners: PartnerRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'featured'>('all');
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = partners;
    if (filter === 'active') r = r.filter((p) => p.isActive);
    else if (filter === 'inactive') r = r.filter((p) => !p.isActive);
    else if (filter === 'featured') r = r.filter((p) => p.isFeatured);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.discount.toLowerCase().includes(q)
      );
    }
    return r;
  }, [partners, filter, query]);

  async function toggleActive(id: string, current: boolean) {
    setBusy(id);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar.');
      router.refresh();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir.');
      router.refresh();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-3 mb-6">
        <input
          type="search"
          placeholder="Buscar por nome, categoria ou desconto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-cream-50 border border-ink/10 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive' | 'featured')}
          className="bg-cream-50 border border-ink/10 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer"
        >
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
          <option value="featured">Em destaque</option>
        </select>
      </div>

      <div className="bg-cream-50 border border-ink/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="hidden md:table-header-group bg-ink text-cream-50">
            <tr className="text-left text-xs uppercase tracking-widest">
              <th className="py-4 px-5">Parceiro</th>
              <th className="py-4 px-5">Categoria</th>
              <th className="py-4 px-5">Desconto</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-ink/40 display-italic text-2xl">
                  Nada encontrado
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-ink/5 flex flex-col md:table-row hover:bg-cream-100 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink">{p.name}</span>
                      {p.isFeatured && (
                        <span className="text-xs bg-coral/10 text-coral px-2 py-0.5 rounded-full">
                          destaque
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 md:py-4 px-5 text-ink/70 text-sm">
                    {p.categoryIcon && <span className="mr-1">{p.categoryIcon}</span>}
                    {p.categoryName}
                  </td>
                  <td className="py-2 md:py-4 px-5">
                    <span className="display-italic text-forest text-xl">{p.discount}</span>
                  </td>
                  <td className="py-2 md:py-4 px-5">
                    <button
                      onClick={() => toggleActive(p.id, p.isActive)}
                      disabled={busy === p.id}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        p.isActive
                          ? 'bg-forest/10 text-forest hover:bg-forest/20'
                          : 'bg-ink/10 text-ink/60 hover:bg-ink/20'
                      }`}
                    >
                      {p.isActive ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-2 md:py-4 px-5 md:text-right">
                    <div className="flex md:justify-end gap-3 text-sm">
                      <Link
                        href={`/admin/parceiros/${p.id}`}
                        className="text-forest hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => remove(p.id, p.name)}
                        disabled={busy === p.id}
                        className="text-coral hover:underline disabled:opacity-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
