import { Benefits } from '@/components/landing/Benefits';
import { CTA } from '@/components/landing/CTA';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Navbar } from '@/components/landing/Navbar';
import { PartnersSection } from '@/components/landing/PartnersSection';
import { StatsTicker } from '@/components/landing/StatsTicker';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const [partnersRaw, categoriesRaw] = await Promise.all([
        prisma.partner.findMany({
            where: { isActive: true },
            include: { category: true },
            orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
        }),
        prisma.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
    ]);

    const partners = partnersRaw.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        discount: p.discount,
        logoUrl: p.logoUrl,
        websiteUrl: p.websiteUrl,
        couponCode: p.couponCode,
        redemptionInstructions: p.redemptionInstructions,
        isFeatured: p.isFeatured,
        category: {
            id: p.category.id,
            name: p.category.name,
            slug: p.category.slug,
            icon: p.category.icon,
        },
    }));

    const categories = categoriesRaw.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
    }));

    return (
        <main className="grain-bg">
            <Navbar />

            <Hero />
            <StatsTicker />
            <Benefits />
            <PartnersSection partners={partners} categories={categories} />
            <HowItWorks />
            <CTA />
            <FAQ />
            <Footer />
        </main>
    );
}
