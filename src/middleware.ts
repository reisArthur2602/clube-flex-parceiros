import { NextResponse, type NextRequest } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas admin protegidas (exceto /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await getSessionFromRequest(req);
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Se já está logado e tenta acessar /admin/login, redireciona pro painel
  if (pathname === '/admin/login') {
    const session = await getSessionFromRequest(req);
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  // Proteção das APIs administrativas
  if (
    (pathname.startsWith('/api/partners') && req.method !== 'GET') ||
    (pathname.startsWith('/api/categories') && req.method !== 'GET')
  ) {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/partners/:path*', '/api/categories/:path*'],
};
