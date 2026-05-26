'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export interface PartnerView {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  discount: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  couponCode: string | null;
  redemptionInstructions: string | null;
  isFeatured: boolean;
  category: { id: string; name: string; slug: string; icon: string | null };
}

export interface CategoryView {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

interface Props {
  partners: PartnerView[];
  categories: CategoryView[];
}

export function PartnersSection({ partners, categories }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'discount' | 'name'>('featured');
  const [selectedPartner, setSelectedPartner] = useState<PartnerView | null>(null);

  const filtered = useMemo(() => {
    let result = partners;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category.slug === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.discount.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sortBy === 'featured') {
      sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    } else if (sortBy === 'discount') {
      const extract = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0;
      sorted.sort((a, b) => extract(b.discount) - extract(a.discount));
    }
    return sorted;
  }, [partners, activeCategory, query, sortBy]);

  return (
    <section id="parceiros" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
              ⊹ Parceiros do clube
            </p>
            <h2 className="display text-5xl lg:text-7xl text-ink leading-[0.95]">
              Encontre seu próximo
              <br />
              <span className="display-italic text-coral">descobrimento.</span>
            </h2>
          </div>
          <p className="text-ink/70 max-w-md text-lg">
            Filtre por categoria, busque por nome ou ordene como preferir.
            <br />
            <span className="font-medium">{partners.length}</span> parceiros disponíveis agora.
          </p>
        </div>

        {/* Controles de busca + ordenação */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-3 mb-6">
          <div className="relative">
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/40"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, categoria ou desconto..."
              className="w-full bg-cream-50 border border-ink/10 rounded-full pl-12 pr-5 py-4 text-base placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'discount' | 'name')}
            className="bg-cream-50 border border-ink/10 rounded-full px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer"
          >
            <option value="featured">Em destaque</option>
            <option value="discount">Maior desconto</option>
            <option value="name">Ordem alfabética</option>
          </select>
        </div>

        {/* Chips de categorias */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all border',
              activeCategory === 'all'
                ? 'bg-ink text-cream-50 border-ink'
                : 'bg-transparent text-ink border-ink/15 hover:border-ink/40'
            )}
          >
            Tudo ({partners.length})
          </button>
          {categories.map((c) => {
            const count = partners.filter((p) => p.category.slug === c.slug).length;
            if (count === 0) return null;
            const active = activeCategory === c.slug;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.slug)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all border flex items-center gap-2',
                  active
                    ? 'bg-ink text-cream-50 border-ink'
                    : 'bg-transparent text-ink border-ink/15 hover:border-ink/40'
                )}
              >
                {c.icon && <span>{c.icon}</span>}
                {c.name} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid de parceiros */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-ink/10 rounded-3xl">
            <p className="display-italic text-3xl text-ink/40 mb-2">Nada encontrado</p>
            <p className="text-ink/60">
              Tente ajustar os filtros ou buscar com outras palavras.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <PartnerCard
                key={p.id}
                partner={p}
                onOpen={() => setSelectedPartner(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      {selectedPartner && (
        <PartnerModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
      )}
    </section>
  );
}

function PartnerCard({
  partner,
  onOpen,
}: {
  partner: PartnerView;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group text-left bg-cream-50 hover:bg-cream-50 rounded-3xl p-6 border border-ink/5 hover:border-ink/20 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          {partner.category.icon && (
            <span className="text-xl">{partner.category.icon}</span>
          )}
          <span className="text-xs uppercase tracking-wider text-ink/50">
            {partner.category.name}
          </span>
        </div>
        {partner.isFeatured && (
          <span className="display-italic text-coral text-sm">★ destaque</span>
        )}
      </div>

      <h3 className="display text-2xl text-ink mb-2 group-hover:text-forest transition-colors">
        {partner.name}
      </h3>
      <p className="text-sm text-ink/60 mb-6 line-clamp-2 flex-1">
        {partner.shortDescription || partner.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-ink/10">
        <div>
          <span className="display text-3xl text-forest">{partner.discount}</span>
        </div>
        <span className="text-xs uppercase tracking-wider text-ink/40 group-hover:text-coral transition-colors flex items-center gap-1">
          ver mais
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function PartnerModal({
  partner,
  onClose,
}: {
  partner: PartnerView;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div
        className="relative bg-cream-50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-4">
            {partner.category.icon && <span>{partner.category.icon}</span>}
            <span className="text-xs uppercase tracking-widest text-ink/50">
              {partner.category.name}
            </span>
          </div>

          <h3 className="display text-4xl text-ink mb-2">{partner.name}</h3>
          <p className="display-italic text-3xl text-coral mb-6">{partner.discount}</p>

          <p className="text-ink/70 leading-relaxed mb-8">{partner.description}</p>

          {partner.couponCode && (
            <div className="bg-forest text-cream-50 rounded-2xl p-5 mb-6">
              <p className="text-xs uppercase tracking-widest text-cream-50/60 mb-2">
                Código do cupom
              </p>
              <p className="display text-3xl tracking-wider">{partner.couponCode}</p>
            </div>
          )}

          {partner.redemptionInstructions && (
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                Como usar
              </h4>
              <p className="text-ink/80">{partner.redemptionInstructions}</p>
            </div>
          )}

          {partner.websiteUrl && (
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Acessar site do parceiro
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
