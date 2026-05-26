'use client';

import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative bg-ink text-cream-50 rounded-[2.5rem] p-10 lg:p-20 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-coral/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-forest/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cream-50/50 mb-6">
                ⊹ Última chamada
              </p>
              <h2 className="display text-5xl lg:text-7xl leading-[0.95]">
                Comece a
                <br />
                <span className="display-italic text-coral">economizar</span>
                <br />
                ainda hoje.
              </h2>
              <p className="mt-8 text-lg text-cream-50/70 max-w-md">
                Mais de 50 mil pessoas já fazem parte. A inscrição leva 2 minutos
                e os primeiros descontos liberam na hora.
              </p>
            </div>

            <div>
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-cream-50/50 mb-2 block">
                      Seu melhor email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="voce@exemplo.com"
                      className="w-full bg-cream-50/10 border border-cream-50/20 rounded-full px-6 py-4 text-cream-50 placeholder:text-cream-50/40 focus:outline-none focus:ring-2 focus:ring-coral transition-all"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-coral text-cream-50 rounded-full py-4 font-medium hover:bg-coral-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Quero meu acesso gratuito
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <p className="text-xs text-cream-50/40 text-center">
                    Sem cartão. Sem spam. Cancele quando quiser.
                  </p>
                </form>
              ) : (
                <div className="bg-forest/40 border border-cream-50/10 rounded-3xl p-8 text-center">
                  <p className="display-italic text-3xl text-coral mb-3">Recebemos!</p>
                  <p className="text-cream-50/80">
                    Em alguns segundos você receberá um email com seu acesso ao clube.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
