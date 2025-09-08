# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a **Better-T-Stack** monorepo invoicing application using Turborepo orchestration with Bun runtime. The architecture consists of:

- **Frontend (`apps/web`)**: Next.js 15 with App Router, React 19, shadcn/ui components, TanStack Query/Form, and Tailwind CSS v4
  - Runs on port 3001 in development with Turbopack for fast HMR
  - Uses Better-Auth client integration for authentication
- **Backend (`apps/server`)**: Hono web framework with tRPC for type-safe APIs, Drizzle ORM with SQLite/Turso database
  - Runs on port 3000 in development with hot reloading via Bun
  - Handles Better-Auth server-side authentication logic
- **Shared packages**: Currently empty but structured for future shared utilities

Key architectural patterns:
- Full-stack type safety through tRPC client-server communication
- Server Components and RSC architecture in Next.js
- Database-first schema design with Drizzle ORM
- Component-driven development with shadcn/ui (New York style)
- Better-Auth integration for authentication across both apps

## Development Commands

**Primary development workflow:**
```bash
# Start all applications in development mode
bun dev

# Start individual applications
bun dev:web          # Frontend on port 3001
bun dev:server       # Backend on port 3000

# Build and quality checks
bun build            # Build all applications  
bun check            # Format and fix code with Biome/Ultracite
bun check-types      # Run TypeScript type checking across workspace
```

**Database operations:**
```bash
# Database setup and management
bun db:push          # Push schema changes to database (no migrations needed)
bun db:studio        # Open Drizzle Studio database GUI on http://localhost:4983
bun db:generate      # Generate migration files (manual migrations)
bun db:migrate       # Apply migrations to database

# Local development database (alternative to Turso)
cd apps/server && bun db:local    # Start local Turso dev server with SQLite
```

**Workspace-specific commands:**
```bash
# Run commands in specific workspaces (alternative to dev:web/dev:server)
bun --filter web [command]       # Run command only in web app
bun --filter server [command]    # Run command only in server app

# Alternative Turbo filter syntax
turbo -F web [command]           # Same as --filter web
turbo -F server [command]        # Same as --filter server
```

## Code Quality Standards

This project uses **Ultracite** (Biome-based) with comprehensive rules covering:
- Maximum type safety with TypeScript strict null checks
- React 19 and Next.js 15 best practices
- Accessibility compliance (comprehensive a11y rules)
- Zero-configuration code formatting and linting

Before committing changes, always run:
1. `bun check` - Auto-format and fix issues
2. `bun check-types` - Verify TypeScript compilation
3. `bun build` - Ensure all apps build successfully

## Important Technical Details

**Database Schema:**
- Uses Drizzle ORM with TypeScript-first approach
- Local development uses SQLite, production uses Turso
- Schema changes require `bun db:push` to apply
- Always use `bun db:studio` to inspect database state

**Frontend Development:**
- Components use shadcn/ui library (installed in `apps/web/components/ui`)
- Forms should use TanStack React Form with Zod validation
- Server state management through TanStack React Query
- Theme system with next-themes for dark mode support

**Backend Development:**
- tRPC routers in `apps/server/src/routers/` (note: `routers` not `routes`)
- Database schema located in `apps/server/src/db/schema/`
- Database queries use Drizzle ORM syntax with Turso dialect
- CORS configured for local development (allows port 3001)
- Hot reloading enabled in development mode via Bun's `--hot` flag
- Uses `tsdown` for TypeScript compilation and building

**Environment Setup:**
- Both apps require `.env` files (`.env.example` templates provided)
- **Server environment variables:**
  - `DATABASE_URL` - Turso database connection string
  - `DATABASE_AUTH_TOKEN` - Turso auth token (optional for local dev)
  - `CORS_ORIGIN` - Frontend URL for CORS (http://localhost:3001)
  - `BETTER_AUTH_SECRET` - Authentication secret key
  - `BETTER_AUTH_URL` - Auth server URL
- **Web environment variables:**
  - `NEXT_PUBLIC_SERVER_URL` - Backend API URL for tRPC client

**Monorepo Navigation:**
- Root commands affect all workspaces via Turborepo
- Use `--filter` flag for workspace-specific operations
- Turborepo caching enabled for build and type-check tasks