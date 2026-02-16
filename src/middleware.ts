// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Verifica si hay una sesión activa
  const { data: { session } } = await supabase.auth.getSession();

  // Si el usuario no está logueado y no está en la página de login, redirige a /perfil (donde está tu Login)
  if (!session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/perfil', req.url));
  }

  return res;
}

// Configura en qué rutas debe ejecutarse el middleware
export const config = {
  matcher: ['/'],
};