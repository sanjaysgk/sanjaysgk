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
