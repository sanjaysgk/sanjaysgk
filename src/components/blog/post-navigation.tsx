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
      {newer ? (
        <Link
          href={`/blog/${newer.slug}#post-title`}
          className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
        >
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="text-sm font-medium truncate">{newer.title}</span>
          </div>
        </Link>
      ) : (
        <div className="rounded-lg border border-border p-4 opacity-40 cursor-not-allowed flex items-center gap-3">
          <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="text-sm text-muted-foreground">No older post</span>
          </div>
        </div>
      )}
      {older ? (
        <Link
          href={`/blog/${older.slug}#post-title`}
          className="group flex items-center justify-end gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 text-right"
        >
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-sm font-medium truncate">{older.title}</span>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div className="rounded-lg border border-border p-4 opacity-40 cursor-not-allowed flex items-center justify-end gap-3 text-right">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-sm text-muted-foreground">No newer post</span>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
        </div>
      )}
    </nav>
  );
}
