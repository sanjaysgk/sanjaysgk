import { allPosts } from "content-collections";
import { BlogCard } from "@/components/blog-card";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const tags = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Posts tagged "${decoded}"`,
    description: `All blog posts tagged with "${decoded}".`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const posts = allPosts
    .filter((post) => (post.tags ?? []).includes(decoded))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    );

  return (
    <section className="max-w-2xl mx-auto">
      <BlurFade delay={0.04}>
        <Link
          href="/blog/tags"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="size-4" />
          All tags
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          #{decoded}
          <span className="ml-2 text-muted-foreground text-base font-normal">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </h1>
      </BlurFade>
      <div className="flex flex-col gap-3 mt-6">
        {posts.map((post, idx) => {
          const slug = post._meta.path.replace(/\.mdx$/, "");
          return (
            <BlurFade key={slug} delay={0.04 * 2 + idx * 0.05}>
              <BlogCard
                slug={slug}
                title={post.title}
                summary={post.summary}
                publishedAt={post.publishedAt}
                tags={post.tags}
                image={post.image}
                content={post.content}
              />
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
