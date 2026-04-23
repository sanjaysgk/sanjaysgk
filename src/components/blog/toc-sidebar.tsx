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
    const handleScroll = () => updateActiveHeadings();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
    <div className="sticky top-24 h-[calc(100vh-8rem)]">
      <div
        ref={scrollRef}
        className="flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)]"
      >
        <span className="text-sm font-semibold mb-4">Table of Contents</span>
        <ul className="flex list-none flex-col gap-y-2 border-l border-border pl-4">
          {headings.map((heading) => {
            const isActive = activeIds.has(heading.slug);
            return (
              <li key={heading.slug} className={getHeadingMargin(heading.depth)}>
                <a
                  href={`#${heading.slug}`}
                  data-toc-active={isActive}
                  className={cn(
                    "text-[13px] leading-snug block py-0.5 transition-colors duration-200 hover:text-foreground",
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
