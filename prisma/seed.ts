import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🌱 Iniciando seed...');

  // ===== ADMIN =====
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@clubevantagem.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Supervisora';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: 'supervisor',
    },
  });
  console.log(`✓ Admin criado: ${adminEmail} / ${adminPassword}`);

  // ===== CATEGORIAS =====
  const categories = [
    { name: 'Gastronomia', icon: '🍽️', order: 1 },
    { name: 'Saúde & Bem-estar', icon: '💆', order: 2 },
    { name: 'Educação', icon: '🎓', order: 3 },
    { name: 'Moda & Beleza', icon: '👗', order: 4 },
    { name: 'Tecnologia', icon: '💻', order: 5 },
    { name: 'Viagens & Lazer', icon: '✈️', order: 6 },
    { name: 'Esportes', icon: '⚽', order: 7 },
    { name: 'Casa & Decoração', icon: '🛋️', order: 8 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: slugify(cat.name) },
      update: {},
      create: {
        name: cat.name,
        slug: slugify(cat.name),
        icon: cat.icon,
        order: cat.order,
      },
    });
  }
  console.log(`✓ ${categories.length} categorias criadas`);

  // ===== PARCEIROS DE EXEMPLO =====
  const allCats = await prisma.category.findMany();
  const catByName = Object.fromEntries(allCats.map((c) => [c.name, c.id]));

  const partners = [
    {
      name: 'Trattoria Bella Vita',
      description:
        'Cozinha italiana autoral em um ambiente acolhedor. Massas frescas feitas em casa, pizzas em forno a lenha e uma carta de vinhos selecionada.',
      shortDescription: 'Cozinha italiana autoral no coração da cidade.',
      discount: '20% OFF',
      categoryName: 'Gastronomia',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'CLUBE20',
      redemptionInstructions:
        'Apresente seu cartão de membro ou o código no momento do pedido. Válido de segunda a quinta, exceto feriados.',
      isFeatured: true,
    },
    {
      name: 'Studio Renove',
      description:
        'Espaço de bem-estar com tratamentos estéticos, massagens terapêuticas e protocolos faciais exclusivos.',
      shortDescription: 'Tratamentos estéticos e massagens.',
      discount: 'Até 35% OFF',
      categoryName: 'Saúde & Bem-estar',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'BEM35',
      redemptionInstructions: 'Agende pelo telefone informando que é membro do clube.',
      isFeatured: true,
    },
    {
      name: 'Instituto Aprendiz',
      description:
        'Cursos de idiomas, programação e desenvolvimento profissional com metodologia exclusiva e turmas reduzidas.',
      shortDescription: 'Cursos de idiomas e desenvolvimento.',
      discount: '40% OFF',
      categoryName: 'Educação',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'EDU40',
      redemptionInstructions: 'Use o cupom no checkout do site ou no momento da matrícula presencial.',
      isFeatured: true,
    },
    {
      name: 'Atelier Norma',
      description:
        'Moda autoral com peças exclusivas, tecidos sustentáveis e atendimento personalizado.',
      shortDescription: 'Moda autoral e sustentável.',
      discount: '15% OFF',
      categoryName: 'Moda & Beleza',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'ATELIER15',
      redemptionInstructions: 'Informe o cupom no caixa. Não cumulativo com outras promoções.',
    },
    {
      name: 'TechHub Store',
      description:
        'Loja especializada em eletrônicos, acessórios e gadgets das melhores marcas com garantia estendida.',
      shortDescription: 'Eletrônicos e gadgets selecionados.',
      discount: '10% OFF',
      categoryName: 'Tecnologia',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'TECH10',
      redemptionInstructions: 'Aplique o cupom no carrinho do site.',
    },
    {
      name: 'Viver Viagens',
      description:
        'Agência boutique com roteiros personalizados, hospedagem em hotéis selecionados e suporte 24/7.',
      shortDescription: 'Roteiros personalizados e hotéis selecionados.',
      discount: 'Até 25% OFF',
      categoryName: 'Viagens & Lazer',
      websiteUrl: 'https://exemplo.com',
      redemptionInstructions: 'Entre em contato com a consultoria informando ser membro do clube.',
      isFeatured: true,
    },
    {
      name: 'Movimento Fit',
      description:
        'Academia completa com aulas funcionais, musculação, pilates e acompanhamento nutricional.',
      shortDescription: 'Academia com aulas e nutrição.',
      discount: '30% OFF',
      categoryName: 'Esportes',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'FIT30',
      redemptionInstructions: 'Apresente a carteirinha do clube na recepção. Válido na primeira mensalidade.',
    },
    {
      name: 'Casa & Forma',
      description:
        'Móveis planejados, decoração e objetos para o lar com design contemporâneo e curadoria especial.',
      shortDescription: 'Móveis e decoração com curadoria.',
      discount: '12% OFF',
      categoryName: 'Casa & Decoração',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'CASA12',
      redemptionInstructions: 'Use o cupom no site ou na loja física.',
    },
    {
      name: 'Café da Esquina',
      description:
        'Café especial torrado artesanalmente, brunch saudável e ambiente perfeito para trabalhar ou relaxar.',
      shortDescription: 'Café especial e brunch.',
      discount: '15% OFF',
      categoryName: 'Gastronomia',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'CAFE15',
      redemptionInstructions: 'Informe o código ao fazer o pedido. Válido todos os dias.',
    },
    {
      name: 'Clínica Vitalis',
      description:
        'Centro médico multidisciplinar com consultas, exames e check-ups completos com atendimento humanizado.',
      shortDescription: 'Consultas e exames.',
      discount: '25% OFF',
      categoryName: 'Saúde & Bem-estar',
      websiteUrl: 'https://exemplo.com',
      redemptionInstructions: 'Agende mencionando o clube. Desconto aplicado em consultas particulares.',
    },
    {
      name: 'Letras Livraria',
      description:
        'Livraria independente com curadoria de literatura, filosofia, arte e clubes de leitura mensais.',
      shortDescription: 'Livraria independente com curadoria.',
      discount: '10% OFF',
      categoryName: 'Educação',
      websiteUrl: 'https://exemplo.com',
      couponCode: 'LIVRO10',
      redemptionInstructions: 'Apresente seu cartão de membro no caixa.',
    },
    {
      name: 'Salão Belvedere',
      description:
        'Salão de beleza completo com cortes, coloração, manicure e tratamentos capilares premium.',
      shortDescription: 'Beleza e tratamentos capilares.',
      discount: '20% OFF',
      categoryName: 'Moda & Beleza',
      websiteUrl: 'https://exemplo.com',
      redemptionInstructions: 'Agende informando ser membro. Não cumulativo com pacotes promocionais.',
    },
  ];

  for (const p of partners) {
    const slug = slugify(p.name);
    await prisma.partner.upsert({
      where: { slug },
      update: {},
      create: {
        name: p.name,
        slug,
        description: p.description,
        shortDescription: p.shortDescription,
        discount: p.discount,
        websiteUrl: p.websiteUrl,
        couponCode: p.couponCode,
        redemptionInstructions: p.redemptionInstructions,
        isFeatured: p.isFeatured ?? false,
        isActive: true,
        categoryId: catByName[p.categoryName],
      },
    });
  }
  console.log(`✓ ${partners.length} parceiros criados`);

  console.log('✅ Seed concluído.');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
