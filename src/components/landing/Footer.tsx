import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ink text-cream-50 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="display text-4xl">Vantagem</span>
              <span className="display-italic text-4xl text-coral">+</span>
            </div>
            <p className="display-italic text-2xl text-cream-50/80 leading-tight max-w-md">
              &ldquo;O clube que reúne os melhores parceiros da cidade em um só lugar.&rdquo;
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-cream-50/40 mb-4">Clube</h4>
            <ul className="space-y-3 text-cream-50/80">
              <li><a href="#parceiros" className="hover:text-coral">Parceiros</a></li>
              <li><a href="#beneficios" className="hover:text-coral">Benefícios</a></li>
              <li><a href="#como-funciona" className="hover:text-coral">Como funciona</a></li>
              <li><a href="#faq" className="hover:text-coral">FAQ</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-cream-50/40 mb-4">Empresa</h4>
            <ul className="space-y-3 text-cream-50/80">
              <li><a href="#" className="hover:text-coral">Sobre nós</a></li>
              <li><a href="#" className="hover:text-coral">Contato</a></li>
              <li><a href="#" className="hover:text-coral">Seja parceiro</a></li>
              <li>
                <Link href="/admin" className="hover:text-coral">
                  Painel admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-cream-50/40 mb-4">Contato</h4>
            <ul className="space-y-3 text-cream-50/80">
              <li>contato@vantagemclube.com.br</li>
              <li>parcerias@vantagemclube.com.br</li>
              <li className="pt-2 text-sm">Av. Exemplo, 1000<br />São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-50/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-cream-50/40">
          <p>© {new Date().getFullYear()} Vantagem+. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-coral">Termos de uso</a>
            <a href="#" className="hover:text-coral">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
