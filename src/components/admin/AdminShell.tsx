'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    role: string;
}

export function AdminShell({ user, children }: { user: User; children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    }

    const nav = [
        { href: '/admin', label: 'Visão geral', exact: true },
        { href: '/admin/parceiros', label: 'Parceiros' },
        { href: '/admin/categorias', label: 'Categorias' },
    ];

    return (
        <div className="min-h-screen bg-cream-100 grain-bg flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col bg-ink text-cream-50 fixed h-screen p-6">
                <Link href="/" className="flex items-baseline gap-1 mb-10">
                    <span className="display text-2xl">Parceiros</span>
                    <span className="display-italic text-2xl text-coral">+</span>
                </Link>

                <p className="text-[10px] uppercase tracking-[0.25em] text-cream-50/40 mb-3">
                    ⊹ Painel
                </p>
                <nav className="space-y-1 flex-1">
                    {nav.map((item) => {
                        const active = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'block px-4 py-2.5 rounded-xl text-sm transition-colors',
                                    active
                                        ? 'bg-cream-50/10 text-cream-50'
                                        : 'text-cream-50/60 hover:text-cream-50 hover:bg-cream-50/5'
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-cream-50/10 pt-4 space-y-2">
                    <div className="px-2">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-cream-50/50">{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-cream-50/60 hover:text-coral transition-colors"
                    >
                        Sair
                    </button>
                    <Link
                        href="/"
                        target="_blank"
                        className="block px-4 py-2 text-sm text-cream-50/60 hover:text-coral"
                    >
                        Ver site ↗
                    </Link>
                </div>
            </aside>

            {/* Topbar mobile */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-ink text-cream-50 px-6 py-4 flex items-center justify-between">
                <Link href="/admin" className="flex items-baseline gap-1">
                    <span className="display text-xl">Parceiros</span>
                    <span className="display-italic text-xl text-coral">+</span>
                </Link>
                <button onClick={logout} className="text-sm text-cream-50/70">
                    Sair
                </button>
            </header>

            {/* Mobile nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-ink border-t border-cream-50/10">
                <div className="grid grid-cols-3">
                    {nav.map((item) => {
                        const active = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-center py-3 text-xs',
                                    active ? 'text-coral' : 'text-cream-50/60'
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">{children}</main>
        </div>
    );
}
