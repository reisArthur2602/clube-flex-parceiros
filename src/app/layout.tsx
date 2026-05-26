import { siteUrl } from '@/constants';
import { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Parceiros | Clube de Flex de Descontos',
        template: '%s | Parceiros | Clube de Flex de Descontos',
    },
    description: 'Transformando seu cotidiano com benefícios, parceiros e descontos exclusivos.',

    metadataBase: new URL(siteUrl),

    alternates: {
        canonical: '/',
    },

    openGraph: {
        title: 'Parceiros | Clube de Flex de Descontos',
        description:
            'Transformando seu cotidiano com benefícios, parceiros e descontos exclusivos.',
        url: '/',
        siteName: 'Parceiros | Clube de Flex de Descontos',
        locale: 'pt_BR',
        type: 'website',
    },

    icons: {
        icon: '/icon.png',
        shortcut: '/favicon.ico',
        apple: '/apple-icon.png',
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={`${fraunces.variable} ${dmSans.variable}`}>
            <body className="font-sans bg-cream-100 text-ink antialiased">{children}</body>
        </html>
    );
}
