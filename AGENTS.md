<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Vectori

## What This Is
A Next.js storefront for Vectori, a photobook and magazine brand. Cart, accounts and orders are local demo stand-ins stored in `localStorage`; nothing is sent to a backend. See `docs/research/vectori/page-brief.md` for the route map and known gaps.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Base UI primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React and extracted SVGs
- **Styling:** Tailwind CSS v4 with oklch design tokens, plus scoped CSS in `vectori.css`

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utilities or scoped CSS; avoid inline styles unless behavior needs dynamic values
- 2-space indentation
- Responsive: mobile-first

## Project Structure
```
src/
  app/              # Next.js routes
  components/
    ui/             # shadcn/ui primitives
    sites/vectori/  # Vectori components and data
  lib/utils.ts      # cn() utility (shadcn)
public/sites/vectori/ # Images, fonts, video and other assets
docs/
  research/vectori/ # Page brief and asset maps
  design-references/vectori/ # Screenshots and visual references
```
