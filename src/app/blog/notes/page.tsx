import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";
import { allPosts } from "content-collections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Quick notes, tutorials, and things I've learned.",
};

const BLUR_FADE_DELAY = 0.04;

export default function NotesPage() {
  const posts = [...allPosts]
    .filter((p) => p.category === "notes")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    );

  return (
    <section className="max-w-2xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            Notes
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Quick notes, tutorials, and things I&apos;ve learned along the way.
          </p>
        </div>
      </BlurFade>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {posts.map((post, idx) => {
            const slug = post._meta.path.replace(/\/index\.mdx$|\.mdx$/, "");
            return (
              <BlurFade key={slug} delay={BLUR_FADE_DELAY * 2 + idx * 0.05}>
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
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No notes yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
