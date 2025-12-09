# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Production build
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript

### Pages (app/)
- `/` - Homepage with hero, services, value props
- `/insights` - Blog posts fetched from Substack RSS (ISR, 1hr revalidate)
- `/insights/[slug]` - Individual article pages with full content
- `/contact` - Contact form (client component with useState)
- `/partners` - Case studies and testimonials

### Key Patterns

**Server vs Client Components**:
- Pages are Server Components by default (can use async/await directly)
- Add `"use client"` only for interactivity (forms, useState, onClick)
- Newsletter signup and article content are client components

**Substack Integration** (`lib/substack.ts`):
- Fetches RSS feed from `conduitofvalue.substack.com/feed`
- Parses with `fast-xml-parser`, extracts full article HTML from `content:encoded`
- `getSubstackPosts()` returns all posts, `getSubstackPost(slug)` returns one
- Uses Next.js ISR with 1-hour revalidation

**Styling**:
- Tailwind v4 with OkLCH color system defined in `app/globals.css`
- CSS variables: `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`
- Typography plugin for article content (`prose` classes)
- Mobile-first responsive: use `md:` and `lg:` prefixes for larger screens

**Layout** (`app/layout.tsx`):
- Wraps all pages with Navigation and Footer
- Exports viewport and metadata configurations

### Utilities
- `lib/utils.ts` - `cn()` function for merging Tailwind classes (clsx + tailwind-merge)
- `lib/substack.ts` - RSS fetching and date formatting

## Deployment

Hosted on Vercel. Push to `main` triggers automatic deployment.
