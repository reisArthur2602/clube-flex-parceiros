import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
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
  title: 'Vantagem+ | Clube de descontos para quem quer mais',
  description:
    'O clube de descontos que reúne os melhores parceiros da cidade. Gastronomia, saúde, moda, educação e muito mais com até 70% OFF.',
  openGraph: {
    title: 'Vantagem+ | Clube de descontos',
    description: 'Os melhores parceiros da cidade com descontos exclusivos.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream-100 text-ink antialiased">{children}</body>
    </html>
  );
}
