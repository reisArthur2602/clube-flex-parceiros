'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Como funciona a assinatura?',
    a: 'A entrada no clube é gratuita. Você se cadastra com seu email, recebe o acesso e já pode usar os descontos com qualquer parceiro listado.',
  },
  {
    q: 'Os descontos podem ser combinados com outras promoções?',
    a: 'Depende de cada parceiro. Em geral, os descontos do clube não são cumulativos com outras campanhas, mas cada parceiro define as próprias regras — sempre informadas na página do estabelecimento.',
  },
  {
    q: 'Posso usar quantas vezes quiser?',
    a: 'Sim. Não há limite de uso por mês. Você pode aproveitar quantas vezes quiser cada parceiro do clube.',
  },
  {
    q: 'Como aplico o desconto na loja física?',
    a: 'Basta apresentar seu cartão digital de membro (disponível no painel) ou informar o cupom no momento do pagamento.',
  },
  {
    q: 'E nas compras online?',
    a: 'Você usa o código do cupom no checkout do site do parceiro. O desconto aparece antes de finalizar.',
  },
  {
    q: 'Como faço para minha empresa virar parceira?',
    a: 'Entre em contato pelo email da equipe (no rodapé). Avaliamos cada solicitação dentro de até 5 dias úteis.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            ⊹ Perguntas frequentes
          </p>
          <h2 className="display text-5xl lg:text-7xl text-ink">
            Tudo o que <span className="display-italic text-forest">você</span>
            <br />
            quer saber.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-cream-50 border border-ink/5 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-cream-50"
                >
                  <span className="display text-xl text-ink">{f.q}</span>
                  <span
                    className={`text-coral text-3xl display-italic transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-ink/70 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
