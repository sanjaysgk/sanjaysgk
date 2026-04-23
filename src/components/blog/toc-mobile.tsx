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
    <div className="w-full rounded-lg border border-border bg-muted/30">
      <details ref={detailsRef} className="group">
        <summary className="flex w-full cursor-pointer items-center justify-between list-none [&::-webkit-details-marker]:hidden">
          <div className="flex w-full items-center px-4 py-3">
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
        <div className="max-h-[30vh] overflow-y-auto border-t border-border">
          <ul className="flex list-none flex-col gap-y-2 px-4 py-3">
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
