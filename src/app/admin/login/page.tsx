'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginCard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/admin';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Erro ao entrar.');
            router.push(redirect);
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro ao entrar.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-cream-50 border border-ink/5 rounded-3xl p-8 lg:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                    ⊹ Acesso restrito
                </p>
                <h1 className="display text-4xl text-ink mb-2">
                    Painel <span className="display-italic text-coral">admin</span>
                </h1>
                <p className="text-ink/60 mb-8">Entre com suas credenciais para continuar.</p>

                <form onSubmit={onSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-xs uppercase tracking-widest text-ink/50 mb-2 block">
                            Email
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            className="w-full bg-cream-100 border border-ink/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
                            placeholder="seuemail@empresa.com"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs uppercase tracking-widest text-ink/50 mb-2 block">
                            Senha
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-cream-100 border border-ink/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
                            placeholder="••••••••"
                        />
                    </label>

                    {error && (
                        <div className="bg-coral/10 border border-coral/20 text-coral-dark rounded-xl px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen bg-cream-100 grain-bg flex items-center justify-center px-6 relative">
            <div className="absolute top-8 left-8">
                <a href="/" className="flex items-baseline gap-1">
                    <span className="display text-2xl text-ink">Parceiros</span>
                    <span className="display-italic text-2xl text-coral">+</span>
                </a>
            </div>
            <Suspense fallback={<div className="text-ink/60">Carregando...</div>}>
                <LoginCard />
            </Suspense>
        </main>
    );
}
