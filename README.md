# 🎮 Aprender para Jogar - Fase 1

Plataforma educacional brasileira gamificada desenvolvida para estudantes dos 6 aos 17 anos (Ensino Fundamental I e II e Ensino Médio), combinando a matriz curricular da BNCC com mecânicas de RPG (experiência, níveis, conquistas e mascote de IA).

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta WCAG AA e suporte a temas claro/escuro
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) e [Radix UI](https://www.radix-ui.com/)
- **Autenticação e Banco**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, Row Level Security)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 🚀 Como Iniciar o Projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Configurar as variáveis de ambiente
Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Abra o `.env.local` e preencha com suas credenciais do projeto Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### 3. Rodar as migrações SQL no Supabase
No painel do Supabase, acesse **SQL Editor** e execute os arquivos contidos em `supabase/migrations/`:
1. `001_initial_schema.sql` (cria tabelas de perfis, XP geral, XP por matéria, atividades e dúvidas)
2. `002_rls_policies.sql` (aplica Row Level Security para proteção de dados)
3. `003_indexes.sql` (cria índices de alta performance para rankings e consultas)

### 4. Executar em modo desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📂 Estrutura de Arquivos Criada

- `app/`
  - `globals.css` - Design system com paleta de cores e modo claro/escuro
  - `layout.tsx` - Layout raiz com ThemeProvider e Toaster
  - `page.tsx` - Roteamento inteligente de login/dashboard
  - `(auth)/`
    - `login/page.tsx` - Tela de login com Google e e-mail
    - `cadastro/page.tsx` - Criação de conta com gamertag e idade
    - `recuperar-senha/page.tsx` - Recuperação de senha por e-mail
  - `(student)/`
    - `inicio/page.tsx` - Dashboard do estudante com XP e Mascote IA
    - `atividades/page.tsx` - Resolução interativa de questões com pontuação de XP
    - `materias/page.tsx` - Grade curricular com todas as disciplinas
    - `desafio-infinito/page.tsx` - Modo sobrevivência de perguntas
    - `biblioteca/page.tsx` - Acervo digital e resumos
    - `anexos/page.tsx` - Envio de tarefas e redações
    - `duvidas/page.tsx` - Tira-dúvidas pedagógico
    - `progresso/page.tsx` - Métricas e taxa de acertos
    - `ranking/page.tsx` - Tabela de líderes da temporada
    - `perfil/page.tsx` - Gerenciamento de conta do aluno
  - `professor/page.tsx` - Painel docente
  - `admin/page.tsx` - Painel de administração do sistema
  - `api/auth/callback/route.ts` - Callback de autenticação OAuth
- `components/`
  - `ui/` - Componentes shadcn/ui (Button, Input, Card, Badge, Avatar, Progress, DropdownMenu, Toast, etc.)
  - `layout/` - Navbar, Sidebar, StudentLayout, TeacherLayout, AdminLayout, ThemeToggle, ThemeProvider
  - `shared/` - XpBar, LevelBadge, AiCompanion, LogoBrand, SubjectCard, LoadingSpinner, EmptyState, ErrorState
- `lib/`
  - `config/assets.ts` - Configuração centralizada de logos e ilustrações
  - `config/xp.ts` - Tabela de XP, cálculo de níveis e porcentagens
  - `subjects/catalog.ts` - Catálogo completo de matérias e tópicos (BNCC)
  - `supabase/client.ts` - Cliente Supabase do navegador
  - `supabase/server.ts` - Cliente Supabase seguro do servidor (cookies + service role)
  - `auth/actions.ts` - Server Actions de cadastro, login, logout e reset de senha
  - `activities/actions.ts` - Server Actions de questões e validação de XP
  - `types/` - Tipos TypeScript de banco (`database.ts`) e aplicação (`app.ts`)
- `middleware.ts` - Proteção de rotas e controle de acesso por papel (RBAC)
- `supabase/migrations/` - Migrações 001, 002 e 003
