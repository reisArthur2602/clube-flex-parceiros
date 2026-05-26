'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryRow {
  id: string;
  name: string;
  icon: string | null;
  order: number;
  partnersCount: number;
}

export function CategoriesManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon: icon || null, order: categories.length + 1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro.');
      setName('');
      setIcon('');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, n: string, count: number) {
    if (count > 0) {
      alert(`Não é possível excluir: existem ${count} parceiro(s) nessa categoria.`);
      return;
    }
    if (!confirm(`Excluir "${n}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro.');
      router.refresh();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
      {/* Formulário de nova categoria */}
      <div className="lg:col-span-1">
        <div className="bg-cream-50 border border-ink/5 rounded-2xl p-6 sticky top-6">
          <h2 className="display text-2xl mb-5">Nova categoria</h2>
          <form onSubmit={add} className="space-y-3">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ink/50 mb-2 block">
                Nome *
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-cream-100 border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
                placeholder="ex: Pet Shop"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ink/50 mb-2 block">
                Ícone (emoji)
              </span>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-cream-100 border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
                placeholder="🐾"
                maxLength={4}
              />
            </label>
            {error && (
              <p className="text-sm text-coral-dark bg-coral/10 rounded-lg px-3 py-2">{error}</p>
            )}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
              {busy ? 'Adicionando...' : 'Adicionar categoria'}
            </button>
          </form>
        </div>
      </div>

      {/* Lista */}
      <div className="lg:col-span-2">
        <div className="bg-cream-50 border border-ink/5 rounded-2xl overflow-hidden">
          {categories.length === 0 ? (
            <p className="p-8 text-center text-ink/40">Nenhuma categoria cadastrada.</p>
          ) : (
            categories.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-center justify-between p-5 hover:bg-cream-100 transition-colors ${
                  i > 0 ? 'border-t border-ink/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{c.icon || '✦'}</span>
                  <div>
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-sm text-ink/50">
                      {c.partnersCount} parceiro{c.partnersCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => remove(c.id, c.name, c.partnersCount)}
                  disabled={busy}
                  className="text-coral text-sm hover:underline disabled:opacity-50"
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
