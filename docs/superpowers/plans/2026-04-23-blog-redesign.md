# Blog System Redesign — astro-erudite Architecture

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the blog post page and supporting components to match astro-erudite's full architecture — 3-column grid with TOC sidebar, mobile TOC with reading progress, callout component, breadcrumbs, enhanced post navigation, scroll-to-top, and upgraded prose typography.

**Architecture:** Blog post page uses a CSS grid with 3 columns: left gutter (TOC sidebar on xl+), center content (max ~md width), right gutter. Mobile gets a collapsible TOC in the blog layout header. All new components are React client components where interactivity is needed, server components otherwise. Existing BlurFade animations and portfolio theme are preserved.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Content Collections, Shiki, Lucide React, CVA, shadcn/ui primitives

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/blog/toc-sidebar.tsx` | Desktop sticky TOC with active heading tracking |
| `src/components/blog/toc-mobile.tsx` | Mobile collapsible TOC with SVG reading progress circle |
| `src/components/blog/post-navigation.tsx` | Prev/next navigation with animated arrows |
| `src/components/blog/scroll-to-top.tsx` | Fixed scroll-to-top button |
| `src/components/blog/breadcrumbs.tsx` | Simple breadcrumb navigation |
| `src/components/blog/callout.tsx` | Collapsible callout/admonition (5 variants) |

### Modified Files
| File | Changes |
|------|---------|
| `src/app/blog/[slug]/page.tsx` | Complete rewrite: 3-column grid, metadata bar, tags, breadcrumbs, TOC integration |
| `src/app/blog/layout.tsx` | Add mobile TOC slot, sticky header |
| `src/app/globals.css` | Replace prose styles with astro-erudite typography |
| `src/mdx-components.tsx` | Register Callout component |
| `src/lib/utils.ts` | Add `getHeadingMargin()` utility |

---

## Task 1: Enhanced Prose Typography

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Add `getHeadingMargin` utility**

In `src/lib/utils.ts`, add after the `readingTime` function:

```typescript
export function getHeadingMargin(depth: number): string {
  const margins: Record<number, string> = {
    3: "ml-4",
    4: "ml-8",
    5: "ml-12",
    6: "ml-16",
  };
  return margins[depth] || "";
}
```

- [ ] **Step 2: Replace prose styles in globals.css**

Replace the entire prose styling section (lines ~136-235) in `src/app/globals.css` with astro-erudite's typography. The key changes:
- Headings get `scroll-mt-32 xl:scroll-mt-20` for TOC anchor offsets
- Paragraphs use `text-foreground/80`
- Lists get muted markers `marker:text-foreground/30`
- Code blocks get max-height `max-h-[min(68vh,1000px)]` with overflow scroll
- Links get underline with offset and decoration color transition
- Blockquotes use `border-l-2` (not `border-l-4 border-amber-500`)
- Tables get centered, max-fit-width styling
- `kbd` element styling added

```css
/* Replace the existing .prose section with: */

.prose {
  @apply text-foreground text-base leading-7;
}

.prose :where(p) {
  @apply text-foreground/80 my-5;
}

.prose :where(h1, h2, h3, h4, h5, h6) {
  @apply text-foreground scroll-mt-32 font-medium xl:scroll-mt-20;
}

.prose :where(h1) {
  @apply mt-8 mb-6 text-4xl;
}

.prose :where(h2) {
  @apply mt-8 mb-4 text-2xl;
}

.prose :where(h3) {
  @apply mt-8 mb-4 text-xl;
}

.prose :where(h4) {
  @apply mt-7 mb-3 text-lg;
}

.prose :where(h5, h6) {
  @apply mt-5 mb-3;
}

.prose :where(a) {
  @apply text-foreground decoration-muted-foreground hover:decoration-foreground font-medium underline underline-offset-[3px] transition-colors;
}

.prose :where(ul) {
  @apply marker:text-foreground/30 my-5 ml-6 list-disc [&>li]:mt-2;
}

.prose :where(ol) {
  @apply marker:text-foreground/30 my-5 ml-6 list-decimal [&>li]:mt-2;
}

.prose :where(li) {
  @apply text-foreground/80 pl-2 [&>p]:my-0;
}

.prose :where(ul ul, ol ol, ul ol, ol ul) {
  @apply marker:text-foreground/30 my-2 ml-6;
}

.prose :where(code) {
  @apply bg-muted/50 text-foreground rounded-sm px-[0.3rem] py-[0.2rem] text-sm font-medium;
}

.prose :where(blockquote) {
  @apply my-6 border-l-2 pl-6 text-muted-foreground italic;
}

.prose :where(hr) {
  @apply my-8 border-t;
}

.prose :where(table) {
  @apply mx-auto my-6 block max-w-fit overflow-x-auto text-sm;
}

.prose :where(thead) {
  @apply border-muted-foreground/30 border-b;
}

.prose :where(th) {
  @apply px-4 py-2 font-medium text-left;
}

.prose :where(tr) {
  @apply border-muted-foreground/30 border-y first:border-t-0 last:border-b-0;
}

.prose :where(td) {
  @apply text-foreground/80 px-4 py-2 align-top;
}

.prose :where(img, video, figure) {
  @apply mx-auto my-6;
}

.prose :where(pre) {
  @apply max-h-[min(68vh,1000px)] overflow-y-auto bg-transparent font-mono leading-relaxed;
}

.prose :where(kbd) {
  @apply text-foreground bg-muted rounded-md border px-2 py-1 text-xs font-medium;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes with no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/lib/utils.ts
git commit -m "feat(blog): upgrade prose typography to match astro-erudite"
```

---

## Task 2: Callout Component

**Files:**
- Create: `src/components/blog/callout.tsx`
- Modify: `src/mdx-components.tsx`

- [ ] **Step 1: Create callout component**

Create `src/components/blog/callout.tsx`:

```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  ShieldAlert,
  MessageSquareWarning,
  ChevronDown,
} from "lucide-react";
import type { ReactNode } from "react";

const calloutConfig = {
  note: {
    style: "border-blue-500 dark:bg-blue-950/5",
    textColor: "text-blue-700 dark:text-blue-300",
    Icon: Info,
  },
  tip: {
    style: "border-green-500 dark:bg-green-950/5",
    textColor: "text-green-700 dark:text-green-300",
    Icon: Lightbulb,
  },
  warning: {
    style: "border-amber-500 dark:bg-amber-950/5",
    textColor: "text-amber-700 dark:text-amber-300",
    Icon: AlertTriangle,
  },
  danger: {
    style: "border-red-500 dark:bg-red-950/5",
    textColor: "text-red-700 dark:text-red-300",
    Icon: ShieldAlert,
  },
  important: {
    style: "border-purple-500 dark:bg-purple-950/5",
    textColor: "text-purple-700 dark:text-purple-300",
    Icon: MessageSquareWarning,
  },
} as const;

const calloutVariants = cva("relative px-4 py-3 my-6 border-l-4 text-sm", {
  variants: {
    variant: {
      note: calloutConfig.note.style,
      tip: calloutConfig.tip.style,
      warning: calloutConfig.warning.style,
      danger: calloutConfig.danger.style,
      important: calloutConfig.important.style,
    },
  },
  defaultVariants: { variant: "note" },
});

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Callout({
  variant = "note",
  title,
  children,
  defaultOpen = true,
  className,
}: CalloutProps) {
  const config = calloutConfig[variant || "note"];
  const IconComponent = config.Icon;

  return (
    <details
      className={cn(
        calloutVariants({ variant }),
        "[&[open]>summary_svg:last-child]:rotate-180 [&[open]>summary]:mb-3",
        className
      )}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center font-medium [&::-webkit-details-marker]:hidden">
        <IconComponent
          className={cn("mr-2 size-4 shrink-0", config.textColor)}
        />
        <span className={cn("font-medium mr-2", config.textColor)}>
          {variant && variant.charAt(0).toUpperCase() + variant.slice(1)}
          {title && (
            <span className="font-normal opacity-70"> ({title})</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
            config.textColor
          )}
        />
      </summary>
      <div>{children}</div>
    </details>
  );
}
```

- [ ] **Step 2: Register Callout in MDX components**

In `src/mdx-components.tsx`, add the import and registration:

Add import: `import { Callout } from "@/components/blog/callout";`

Add to `mdxComponents` object: `Callout,`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/callout.tsx src/mdx-components.tsx
git commit -m "feat(blog): add callout/admonition component with 5 variants"
```

---

## Task 3: Breadcrumbs Component

**Files:**
- Create: `src/components/blog/breadcrumbs.tsx`

- [ ] **Step 1: Create breadcrumbs component**

Create `src/components/blog/breadcrumbs.tsx`:

```tsx
import Link from "next/link";
import { ChevronRight, Home, NotebookText } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="size-4" />
      </Link>
      <ChevronRight className="size-3" />
      <Link
        href="/blog"
        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
      >
        <NotebookText className="size-4" />
        <span>Blog</span>
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href || "#"}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/breadcrumbs.tsx
git commit -m "feat(blog): add breadcrumbs navigation component"
```

---

## Task 4: Post Navigation Component

**Files:**
- Create: `src/components/blog/post-navigation.tsx`

- [ ] **Step 1: Create post navigation with animated arrows**

Create `src/components/blog/post-navigation.tsx`:

```tsx
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavPost {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  newer?: NavPost;
  older?: NavPost;
  className?: string;
}

export function PostNavigation({
  newer,
  older,
  className,
}: PostNavigationProps) {
  return (
    <nav className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {/* Newer (Previous) Post */}
      {newer ? (
        <Link
          href={`/blog/${newer.slug}#post-title`}
          className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="text-sm font-medium truncate">
              {newer.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-border p-4 opacity-40 cursor-not-allowed flex items-center gap-3">
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="text-sm text-muted-foreground">
              No older post
            </span>
          </div>
        </div>
      )}

      {/* Older (Next) Post */}
      {older ? (
        <Link
          href={`/blog/${older.slug}#post-title`}
          className="group flex items-center justify-end gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 text-right"
        >
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-sm font-medium truncate">
              {older.title}
            </span>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div className="rounded-lg border border-border p-4 opacity-40 cursor-not-allowed flex items-center justify-end gap-3 text-right">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-sm text-muted-foreground">
              No newer post
            </span>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/post-navigation.tsx
git commit -m "feat(blog): add post navigation with animated arrows"
```

---

## Task 5: Scroll-to-Top Button

**Files:**
- Create: `src/components/blog/scroll-to-top.tsx`

- [ ] **Step 1: Create scroll-to-top component**

Create `src/components/blog/scroll-to-top.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(window.scrollY > 300 && !footerVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-6 bottom-20 z-50 size-9 flex items-center justify-center rounded-lg border border-border bg-background shadow-sm transition-all hover:bg-muted ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4 transition-transform hover:-translate-y-0.5" />
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/scroll-to-top.tsx
git commit -m "feat(blog): add scroll-to-top button"
```

---

## Task 6: TOC Sidebar (Desktop)

**Files:**
- Create: `src/components/blog/toc-sidebar.tsx`

- [ ] **Step 1: Create desktop TOC sidebar with active heading tracking**

Create `src/components/blog/toc-sidebar.tsx`:

```tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn, getHeadingMargin } from "@/lib/utils";

interface TOCHeading {
  depth: number;
  slug: string;
  text: string;
}

interface TOCSidebarProps {
  headings: TOCHeading[];
}

const HEADER_OFFSET = 150;

export function TOCSidebar({ headings }: TOCSidebarProps) {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateActiveHeadings = useCallback(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    const elements = prose.querySelectorAll("h2, h3, h4, h5, h6");
    if (elements.length === 0) return;

    const viewportTop = window.scrollY + HEADER_OFFSET;
    const viewportBottom = window.scrollY + window.innerHeight;
    const visible = new Set<string>();

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const nextEl = elements[index + 1];
      const bottom = nextEl
        ? nextEl.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight;

      if (top < viewportBottom && bottom > viewportTop) {
        visible.add(el.id);
      }
    });

    setActiveIds(visible);
  }, []);

  useEffect(() => {
    updateActiveHeadings();
    window.addEventListener("scroll", updateActiveHeadings, { passive: true });
    window.addEventListener("resize", updateActiveHeadings, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveHeadings);
      window.removeEventListener("resize", updateActiveHeadings);
    };
  }, [updateActiveHeadings]);

  useEffect(() => {
    if (activeIds.size === 0 || !scrollRef.current) return;
    const firstActive = scrollRef.current.querySelector(
      `[data-toc-active="true"]`
    );
    if (firstActive) {
      firstActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIds]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-20 col-start-1 row-span-1 mr-8 ml-auto hidden h-[calc(100vh-5rem)] max-w-xs xl:block">
      <div
        ref={scrollRef}
        className="flex max-h-[calc(100vh-8rem)] flex-col overflow-y-auto px-4"
      >
        <span className="text-sm font-medium mb-3">On this page</span>
        <ul className="flex list-none flex-col gap-y-2">
          {headings.map((heading) => {
            const isActive = activeIds.has(heading.slug);
            return (
              <li key={heading.slug} className={getHeadingMargin(heading.depth)}>
                <a
                  href={`#${heading.slug}`}
                  data-toc-active={isActive}
                  className={cn(
                    "text-sm underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/toc-sidebar.tsx
git commit -m "feat(blog): add desktop TOC sidebar with active heading tracking"
```

---

## Task 7: TOC Mobile (Collapsible with Progress)

**Files:**
- Create: `src/components/blog/toc-mobile.tsx`

- [ ] **Step 1: Create mobile TOC with reading progress circle**

Create `src/components/blog/toc-mobile.tsx`:

```tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn, getHeadingMargin } from "@/lib/utils";

interface TOCHeading {
  depth: number;
  slug: string;
  text: string;
}

interface TOCMobileProps {
  headings: TOCHeading[];
}

const CIRCUMFERENCE = 2 * Math.PI * 10;
const HEADER_OFFSET = 138;

export function TOCMobile({ headings }: TOCMobileProps) {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("Overview");
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
  }, []);

  const updateActiveHeadings = useCallback(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    const elements = prose.querySelectorAll("h2, h3, h4, h5, h6");
    if (elements.length === 0) return;

    const viewportTop = window.scrollY + HEADER_OFFSET;
    const viewportBottom = window.scrollY + window.innerHeight;
    const visible = new Set<string>();

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const nextEl = elements[index + 1];
      const bottom = nextEl
        ? nextEl.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight;

      if (top < viewportBottom && bottom > viewportTop) {
        visible.add(el.id);
      }
    });

    setActiveIds(visible);

    const activeTexts = headings
      .filter((h) => visible.has(h.slug))
      .map((h) => h.text);
    setCurrentSection(activeTexts.length > 0 ? activeTexts[0] : "Overview");
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      updateProgress();
      updateActiveHeadings();
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateProgress, updateActiveHeadings]);

  if (headings.length === 0) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="w-full xl:hidden border-b border-border">
      <details ref={detailsRef} className="group">
        <summary className="flex w-full cursor-pointer items-center justify-between list-none [&::-webkit-details-marker]:hidden">
          <div className="mx-auto flex w-full max-w-2xl items-center px-6 py-3">
            <svg className="relative mr-3 size-5" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/20"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 12 12)"
                style={{ transition: "stroke-dashoffset 150ms" }}
              />
            </svg>
            <span className="text-muted-foreground flex-grow truncate text-sm">
              {currentSection}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </div>
        </summary>
        <div className="mx-auto max-w-2xl max-h-[30vh] overflow-y-auto">
          <ul className="flex list-none flex-col gap-y-2 px-6 pb-4">
            {headings.map((heading) => {
              const isActive = activeIds.has(heading.slug);
              return (
                <li
                  key={heading.slug}
                  className={getHeadingMargin(heading.depth)}
                >
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => {
                      if (detailsRef.current) {
                        detailsRef.current.open = false;
                      }
                    }}
                    className={cn(
                      "text-sm underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit",
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </details>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/toc-mobile.tsx
git commit -m "feat(blog): add mobile TOC with reading progress circle"
```

---

## Task 8: Rewrite Blog Post Page

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Rewrite blog post page with 3-column grid layout**

Complete rewrite of `src/app/blog/[slug]/page.tsx`:

```tsx
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { formatDate, readingTime } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostNavigation } from "@/components/blog/post-navigation";
import { TOCSidebar } from "@/components/blog/toc-sidebar";
import { TOCMobile } from "@/components/blog/toc-mobile";
import { ScrollToTop } from "@/components/blog/scroll-to-top";
import Link from "next/link";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  if (!post) return {};

  const { title, summary, publishedAt, image } = post;
  const ogImage = image || `${DATA.url}/blog/${slug}/opengraph-image`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${DATA.url}/blog/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
    },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1");
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ depth: match[1].length, text, slug });
  }
  return headings;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sortedPosts = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  const postIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  if (postIndex === -1) notFound();

  const post = sortedPosts[postIndex];
  const newerPost = postIndex > 0 ? sortedPosts[postIndex - 1] : undefined;
  const olderPost =
    postIndex < sortedPosts.length - 1
      ? sortedPosts[postIndex + 1]
      : undefined;

  const headings = extractHeadings(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            description: post.summary,
            image: post.image || `${DATA.url}/blog/${slug}/opengraph-image`,
            url: `${DATA.url}/blog/${slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      {/* Mobile TOC */}
      <TOCMobile headings={headings} />

      {/* 3-column grid */}
      <div className="grid grid-cols-[minmax(0px,1fr)_min(calc(100%-2rem),42rem)_minmax(0px,1fr)] gap-y-6">
        {/* Desktop TOC Sidebar */}
        <TOCSidebar headings={headings} />

        {/* Center Content Column */}
        <div className="col-start-2 flex flex-col gap-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: post.title }]} />

          {/* Post Header */}
          <header className="flex flex-col gap-y-4">
            <h1
              id="post-title"
              className="scroll-mt-20 text-3xl leading-tight font-semibold tracking-tighter sm:text-4xl"
            >
              {post.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{readingTime(post.content)}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tags/${tag}`}>
                    <Badge
                      variant="outline"
                      className="text-xs hover:bg-muted transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Decorative line */}
          <div className="flex items-center gap-4">
            <div
              className="flex-1 h-px bg-border"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              }}
            />
          </div>

          {/* Top Navigation */}
          <PostNavigation
            newer={
              newerPost
                ? {
                    slug: newerPost._meta.path.replace(/\.mdx$/, ""),
                    title: newerPost.title,
                  }
                : undefined
            }
            older={
              olderPost
                ? {
                    slug: olderPost._meta.path.replace(/\.mdx$/, ""),
                    title: olderPost.title,
                  }
                : undefined
            }
          />

          {/* Article */}
          <article className="prose max-w-none">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </article>

          {/* Bottom Navigation */}
          <PostNavigation
            newer={
              newerPost
                ? {
                    slug: newerPost._meta.path.replace(/\.mdx$/, ""),
                    title: newerPost.title,
                  }
                : undefined
            }
            older={
              olderPost
                ? {
                    slug: olderPost._meta.path.replace(/\.mdx$/, ""),
                    title: olderPost.title,
                  }
                : undefined
            }
            className="mt-8 pt-8 border-t border-border"
          />
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}
```

- [ ] **Step 2: Update blog layout to support wider content for post pages**

The blog post page uses a 3-column grid that needs to break out of the `max-w-2xl` container. Update `src/app/blog/layout.tsx` — change the outer wrapper so the children can expand:

The root layout already constrains to `max-w-2xl`. The blog post page's grid will work within this on mobile, and the TOC sidebar will use negative margins or be hidden on non-xl screens. No layout change needed since the TOC is hidden below xl and the grid center column fits within max-w-2xl.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes with all routes including TOC, breadcrumbs, navigation

- [ ] **Step 4: Test on dev server**

Run: `npm run dev`
Navigate to `http://localhost:3000/blog/[any-post]`
Verify:
- Breadcrumbs show Home > Blog > Post Title
- Metadata bar shows date and reading time
- Tags are displayed as clickable badges
- TOC sidebar appears on xl+ screens
- Mobile TOC appears on smaller screens with progress circle
- Prev/Next navigation works with arrow animations
- Scroll-to-top appears after scrolling down
- Prose typography matches the upgraded styles

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat(blog): rewrite post page with 3-column grid, TOC, breadcrumbs, metadata"
```

---

## Task 9: Final Integration & Cleanup

- [ ] **Step 1: Verify all blog routes work**

Run: `npm run build`
Verify these routes:
- `/blog` — listing with rich cards
- `/blog/[slug]` — post with TOC, breadcrumbs, navigation
- `/blog/tags` — tag index
- `/blog/tags/[tag]` — filtered posts

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Fix any issues.

- [ ] **Step 3: Commit and push**

```bash
git add -A
git commit -m "feat(blog): complete blog redesign with astro-erudite architecture"
git push
```
