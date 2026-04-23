# Portfolio - sanjaysgk

## Project Overview

Personal portfolio and blog website for Sanjay — bioinformatician, researcher, and aspiring entrepreneur.

## Tech Stack

- **Framework:** Next.js 16 with React 19 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with oklch() color tokens
- **UI:** shadcn/ui (new-york style) + Radix UI + MagicUI animations
- **Content:** MDX blog posts via Content Collections
- **Code Highlighting:** Shiki (dual light/dark theme)
- **Theming:** next-themes (light/dark mode)
- **Deployment:** Vercel

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Auto-fix lint issues
```

## Project Structure

- `src/app/` — Next.js App Router pages (home, blog, blog/[slug])
- `src/components/` — React components (navbar, sections, project-card)
- `src/components/ui/` — shadcn/ui components (badge, button, card, etc.)
- `src/components/ui/svgs/` — Tech skill SVG icon components
- `src/components/magicui/` — Animation components (blur-fade, dock, flickering-grid)
- `src/components/section/` — Page section components (projects, work, contact, hackathons)
- `src/components/mdx/` — MDX rendering components (code-block, media-container)
- `src/data/resume.tsx` — **Central data file** — all portfolio content lives here
- `src/lib/` — Utility functions (cn, formatDate, pagination, remark plugin)
- `content/` — MDX blog posts
- `public/` — Static assets (logos, profile photo)

## Key Patterns

### Components
- **Server Components by default** — only use `"use client"` when state/effects are needed
- **cn() utility** for merging Tailwind classes: `import { cn } from "@/lib/utils"`
- **BlurFade animations** with staggered delays: `BLUR_FADE_DELAY * N + index * 0.05`

### Data
- All portfolio content is in `src/data/resume.tsx` — edit this file to update projects, work experience, skills, education, hackathons
- Blog posts are MDX files in `content/` with frontmatter: title, publishedAt, summary, author

### Styling
- Design tokens defined as CSS custom properties in `src/app/globals.css` using oklch()
- Light and dark theme variants in `:root` and `.dark` selectors
- Use Tailwind utility classes; avoid inline styles

### Blog Posts
- Add new posts as `.mdx` files in `content/`
- Required frontmatter: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `author`
- Optional: `updatedAt`, `image`
- Content Collections processes MDX with remark-gfm

### SVG Icons
- Tech skill icons are React components in `src/components/ui/svgs/`
- Export from barrel file, referenced in `resume.tsx` skills section

## Conventions

- Path alias: `@/*` maps to `./src/*`
- Use `next/image` for images with proper width/height
- Security headers are configured in `next.config.mjs`
- No test framework is set up — verify changes visually via dev server
- Run `npm run lint` before committing
