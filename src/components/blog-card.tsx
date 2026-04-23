import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, readingTime } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags?: string[];
  image?: string;
  content: string;
}

export function BlogCard({
  slug,
  title,
  summary,
  publishedAt,
  tags,
  image,
  content,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-xl border border-border/50 p-4 transition-all duration-200 hover:bg-muted/50 hover:border-border hover:shadow-sm"
    >
      <div className="flex gap-4">
        {image && (
          <div className="hidden sm:block shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="size-20 rounded-lg object-cover bg-muted"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold leading-snug group-hover:text-foreground transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {summary}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 mt-3 text-xs text-muted-foreground">
            <span>{formatDate(publishedAt)}</span>
            <Separator orientation="vertical" className="h-3" />
            <span>{readingTime(content)}</span>
            {tags && tags.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-3" />
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] font-medium px-1.5 py-0 h-5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
