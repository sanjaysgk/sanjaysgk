import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on research, bioinformatics, building products, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on research, bioinformatics, building products, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on research, bioinformatics, building products, and more.",
  },
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            Blog
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Thoughts on research, bioinformatics, building products, and more.
          </p>
        </div>
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Latest posts
            </h2>
          </BlurFade>

          <div className="flex flex-col gap-3">
            {paginatedPosts.map((post, idx) => {
              const slug = post._meta.path.replace(/\.mdx$/, "");
              return (
                <BlurFade
                  key={slug}
                  delay={BLUR_FADE_DELAY * 3 + idx * 0.05}
                >
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

          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex items-center justify-between mt-8">
                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className="h-8 px-3 flex items-center text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="h-8 px-3 flex items-center text-sm border border-border rounded-lg opacity-40 cursor-not-allowed">
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className="h-8 px-3 flex items-center text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="h-8 px-3 flex items-center text-sm border border-border rounded-lg opacity-40 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
