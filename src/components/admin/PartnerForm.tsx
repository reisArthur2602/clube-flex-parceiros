'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string | null;
}

interface PartnerData {
  id?: string;
  name?: string;
  description?: string;
  shortDescription?: string | null;
  discount?: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  couponCode?: string | null;
  redemptionInstructions?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  categoryId?: string;
}

export function PartnerForm({
  categories,
  partner,
}: {
  categories: Category[];
  partner?: PartnerData;
}) {
  const router = useRouter();
  const editing = !!partner?.id;

  const [form, setForm] = useState({
    name: partner?.name || '',
    description: partner?.description || '',
    shortDescription: partner?.shortDescription || '',
    discount: partner?.discount || '',
    logoUrl: partner?.logoUrl || '',
    websiteUrl: partner?.websiteUrl || '',
    couponCode: partner?.couponCode || '',
    redemptionInstructions: partner?.redemptionInstructions || '',
    isActive: partner?.isActive ?? true,
    isFeatured: partner?.isFeatured ?? false,
    categoryId: partner?.categoryId || categories[0]?.id || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = editing ? `/api/partners/${partner!.id}` : '/api/partners';
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao salvar.');
      router.push('/admin/parceiros');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    if (!partner?.id) return;
    if (!confirm(`Excluir "${form.name}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/partners/${partner.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir.');
      router.push('/admin/parceiros');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  const field =
    'w-full bg-cream-50 border border-ink/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest text-ink';
  const labelClass = 'text-xs uppercase tracking-widest text-ink/50 mb-2 block';

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-coral/10 border border-coral/20 text-coral-dark rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <fieldset className="space-y-5">
        <legend className="display text-2xl mb-3">Informações principais</legend>

        <label className="block">
          <span className={labelClass}>Nome do parceiro *</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            className={field}
            placeholder="ex: Trattoria Bella Vita"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelClass}>Categoria *</span>
            <select
              value={form.categoryId}
              onChange={(e) => update('categoryId', e.target.value)}
              required
              className={field}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Desconto *</span>
            <input
              type="text"
              value={form.discount}
              onChange={(e) => update('discount', e.target.value)}
              required
              className={field}
              placeholder="ex: 30% OFF ou Até 50% OFF"
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Descrição curta (até 120 caracteres)</span>
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) => update('shortDescription', e.target.value.slice(0, 120))}
            className={field}
            placeholder="Resumo que aparece no card do parceiro"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Descrição completa *</span>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            required
            rows={4}
            className={field}
            placeholder="Descreva o parceiro em detalhes — produtos, serviços, diferenciais..."
          />
        </label>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="display text-2xl mb-3">Resgate da vantagem</legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelClass}>Código do cupom</span>
            <input
              type="text"
              value={form.couponCode}
              onChange={(e) => update('couponCode', e.target.value.toUpperCase())}
              className={field}
              placeholder="ex: CLUBE20"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Site do parceiro</span>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(e) => update('websiteUrl', e.target.value)}
              className={field}
              placeholder="https://..."
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Instruções de uso</span>
          <textarea
            value={form.redemptionInstructions}
            onChange={(e) => update('redemptionInstructions', e.target.value)}
            rows={3}
            className={field}
            placeholder="Como o membro deve apresentar/aplicar o desconto?"
          />
        </label>

        <label className="block">
          <span className={labelClass}>URL do logo (opcional)</span>
          <input
            type="url"
            value={form.logoUrl}
            onChange={(e) => update('logoUrl', e.target.value)}
            className={field}
            placeholder="https://..."
          />
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="display text-2xl mb-3">Visibilidade</legend>

        <label className="flex items-center gap-3 bg-cream-50 border border-ink/10 rounded-xl px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => update('isActive', e.target.checked)}
            className="w-4 h-4 accent-forest"
          />
          <div>
            <p className="font-medium text-ink">Parceiro ativo</p>
            <p className="text-sm text-ink/60">
              Quando desativado, não aparece na landing page.
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 bg-cream-50 border border-ink/10 rounded-xl px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => update('isFeatured', e.target.checked)}
            className="w-4 h-4 accent-coral"
          />
          <div>
            <p className="font-medium text-ink">Em destaque</p>
            <p className="text-sm text-ink/60">
              Aparece com selo &ldquo;destaque&rdquo; e ordenado primeiro.
            </p>
          </div>
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/10">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Salvando...' : editing ? 'Salvar alterações' : 'Adicionar parceiro'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>

        {editing && (
          <button
            type="button"
            onClick={onDelete}
            disabled={loading}
            className="text-coral hover:underline text-sm"
          >
            Excluir parceiro
          </button>
        )}
      </div>
    </form>
  );
}
