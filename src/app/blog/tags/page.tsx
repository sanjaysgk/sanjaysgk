import { allPosts } from "content-collections";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse blog posts by tag.",
};

function getSortedTags() {
  const tagCounts: Record<string, number> = {};
  for (const post of allPosts) {
    const tags = post.tags ?? [];
    for (const tag of tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
}

export default function TagsPage() {
  const tags = getSortedTags();

  return (
    <section className="max-w-2xl mx-auto">
      <BlurFade delay={0.04}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Tags</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Browse posts by topic.
        </p>
      </BlurFade>
      <BlurFade delay={0.08}>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link key={tag} href={`/blog/tags/${tag}`}>
                <Badge
                  variant="outline"
                  className="text-sm px-3 py-1.5 hover:bg-muted transition-colors cursor-pointer"
                >
                  {tag}
                  <span className="ml-1.5 text-muted-foreground">({count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No tags yet.</p>
        )}
      </BlurFade>
    </section>
  );
}
