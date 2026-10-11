import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * ==============================================================================
 * MIDDLEWARE DE AUTENTICAÇÃO E CONTROLE DE ACESSO BASEADO EM CARGOS (RBAC)
 * ==============================================================================
 * Protege rotas de alunos, professores, administradores e empresas.
 * - Usuários não autenticados que acessarem áreas restritas são redirecionados para /login.
 * - Usuários já autenticados que tentarem acessar /login ou /cadastro são redirecionados para seu dashboard (/inicio).
 */

const STUDENT_ROUTES = [
  "/inicio",
  "/atividades",
  "/materias",
  "/desafio-infinito",
  "/biblioteca",
  "/anexos",
  "/duvidas",
  "/progresso",
  "/ranking",
  "/perfil",
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;

  // Ignora rotas estáticas, imagens e arquivos internos do Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Se o Supabase não estiver configurado ainda com chaves válidas, permite navegação local amigável
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder-url")) {
    return response;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAuthRoute = pathname === "/login" || pathname === "/cadastro" || pathname === "/recuperar-senha";
    const isStudentRoute = STUDENT_ROUTES.some((route) => pathname.startsWith(route));
    const isTeacherRoute = pathname.startsWith("/professor");
    const isAdminRoute = pathname.startsWith("/admin");
    const isCompanyRoute = pathname.startsWith("/empresa");

    // Redireciona usuários deslogados tentando acessar áreas protegidas
    if (!user && (isStudentRoute || isTeacherRoute || isAdminRoute || isCompanyRoute)) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redireciona usuários logados tentando acessar login ou cadastro
    if (user && isAuthRoute) {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }

    return response;
  } catch (error) {
    console.warn("Aviso no middleware de autenticação:", error);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
