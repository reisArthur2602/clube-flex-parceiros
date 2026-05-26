# Vantagem+ — Clube de Descontos

Aplicação Next.js 14 (App Router) com landing page de alta conversão e painel
administrativo para gerenciar parceiros. Banco PostgreSQL via Prisma.

## ✨ O que está pronto

- **Landing page** com hero, prova social, benefícios, lista de parceiros com
  filtros e busca, "como funciona", CTA final e FAQ.
- **Painel admin** protegido por login (JWT em cookie httpOnly).
- **CRUD de parceiros** (criar, editar, ativar/desativar, destacar, excluir).
- **Gestão de categorias** (criar e excluir).
- **Filtros e busca** dinâmicos na landing — por nome, categoria, desconto.
- Tipografia editorial com fontes Fraunces + DM Sans, paleta cream/ink/forest/coral.

## 🚀 Como rodar localmente

### Pré-requisitos

- **Node.js 18+** (recomendado 20+)
- **PostgreSQL 14+** rodando localmente OU uma string de conexão para um banco
  hospedado (Supabase, Neon, Railway, etc.)

### Passo a passo

```bash
# 1. Instale as dependências
npm install

# 2. Copie o arquivo de ambiente
cp .env.example .env

# 3. Edite o .env com sua string de conexão PostgreSQL
# Exemplo para PostgreSQL local:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clube_vantagem?schema=public"
#
# Não esqueça de trocar o JWT_SECRET por uma string aleatória.

# 4. Crie as tabelas no banco
npm run db:push

# 5. Popule com dados iniciais (admin + categorias + 12 parceiros de exemplo)
npm run db:seed

# 6. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse:

- **Landing**: http://localhost:3000
- **Login admin**: http://localhost:3000/admin/login

### Credenciais padrão do admin (definidas no `.env`)

```
Email:  admin@clubevantagem.com
Senha:  admin123
```

⚠️ **Importante**: troque essas credenciais antes de subir para produção.
Edite as variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env` e rode `npm run
db:seed` novamente, ou crie um usuário direto pelo Prisma Studio.

## 📦 Como criar um banco PostgreSQL rápido (opções)

### Opção A — PostgreSQL local (Docker)

```bash
docker run --name pg-clube \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=clube_vantagem \
  -p 5432:5432 \
  -d postgres:16
```

A `DATABASE_URL` no `.env` ficará:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clube_vantagem?schema=public"
```

### Opção B — Neon, Supabase ou Railway

Crie um banco gratuito em <https://neon.tech>, <https://supabase.com> ou
<https://railway.app> e copie a `DATABASE_URL` fornecida no painel.

## 🧰 Scripts disponíveis

| Comando             | O que faz                                        |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento (porta 3000)         |
| `npm run build`     | Build de produção                                |
| `npm start`         | Inicia em modo produção                          |
| `npm run db:push`   | Cria/atualiza tabelas no banco                   |
| `npm run db:migrate`| Cria uma migração versionada                     |
| `npm run db:seed`   | Popula admin + categorias + parceiros de exemplo |
| `npm run db:studio` | Abre o Prisma Studio (painel visual do banco)    |

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx               # Layout raiz com fontes
│   ├── page.tsx                 # Landing page (server component)
│   ├── globals.css              # Estilos globais
│   ├── api/
│   │   ├── auth/                # login, logout, me
│   │   ├── partners/            # GET pública + POST/PATCH/DELETE protegidas
│   │   └── categories/          # idem
│   └── admin/
│       ├── login/               # Tela de login pública
│       └── (protected)/         # Tudo aqui requer sessão (route group)
│           ├── layout.tsx       # Sidebar
│           ├── page.tsx         # Dashboard
│           ├── parceiros/       # Listar, criar, editar
│           └── categorias/      # Gerenciar categorias
├── components/
│   ├── landing/                 # Hero, Benefits, PartnersSection, etc.
│   └── admin/                   # Shell, PartnersTable, PartnerForm, etc.
├── lib/
│   ├── prisma.ts                # Prisma client singleton
│   ├── auth.ts                  # JWT (jose) + cookies httpOnly
│   └── utils.ts                 # cn(), slugify(), formatDate()
└── middleware.ts                # Protege /admin e APIs com mutação
```

## 🔐 Como funciona a autenticação

- O login (`POST /api/auth/login`) verifica email/senha contra `AdminUser` no
  banco (senha em bcrypt) e emite um JWT assinado com `JWT_SECRET`.
- O token vai em um cookie `cv_session` httpOnly, SameSite=Lax, expirando em 7
  dias.
- O `middleware.ts` intercepta todas as rotas `/admin/*` (exceto `/admin/login`)
  e APIs com mutação. Se não houver token válido, redireciona para login (UI) ou
  retorna 401 (API).

## ➕ Adicionar/editar parceiros

1. Faça login em `/admin/login`.
2. Use o menu lateral para ir em **Parceiros → + Adicionar parceiro**.
3. Preencha o formulário (nome, categoria, desconto, cupom, instruções etc.).
4. Marque como **Ativo** para aparecer na landing.
5. Marque **Em destaque** para destacá-lo no topo da lista pública.

A landing é renderizada com `dynamic = 'force-dynamic'`, ou seja, sempre busca
os dados atualizados do banco — qualquer alteração aparece imediatamente.

## 🎨 Personalização rápida

- **Cores e fontes**: `tailwind.config.ts` e `src/app/globals.css`.
- **Textos da landing**: arquivos em `src/components/landing/`.
- **Nome da marca**: troque "Vantagem+" em `Navbar.tsx`, `Hero.tsx`, `Footer.tsx`,
  `layout.tsx`, etc.

## 🚢 Deploy

Recomendado: **Vercel** (Next.js) + **Neon/Supabase** (Postgres).

1. Crie um banco em provedor de sua escolha e pegue a `DATABASE_URL`.
2. Importe o repositório no Vercel.
3. Defina as variáveis de ambiente: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, `ADMIN_NAME`.
4. Após o primeiro deploy, rode `npm run db:push && npm run db:seed` em uma
   máquina conectada ao banco de produção (ou use o Prisma Studio).

## 📝 Licença

Projeto entregue como base de partida. Use livremente.
