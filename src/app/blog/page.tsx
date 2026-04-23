import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { getPostSlug, formatDate, readingTime } from "@/lib/utils";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on research, bioinformatics, building products, and more.",
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

function groupByYear(
  posts: typeof allPosts
): Record<string, typeof allPosts> {
  const groups: Record<string, typeof allPosts> = {};
  for (const post of posts) {
    const year = new Date(post.publishedAt).getUTCFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  }
  return groups;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts]
    .filter((p) => !p.category || p.category === "blog")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const yearGroups = groupByYear(paginatedPosts);
  const sortedYears = Object.keys(yearGroups).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="max-w-2xl mx-auto">
      {/* Breadcrumbs */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Breadcrumbs
          items={[
            {
              label: `Page ${currentPage}`,
              icon: "page",
            },
          ]}
          className="mb-6"
        />
      </BlurFade>

      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Blog Posts
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            A collection of my writings and thoughts on various topics.
          </p>
        </div>
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          {/* Year-grouped posts */}
          {sortedYears.map((year, yearIdx) => (
            <div key={year} className="mb-10">
              <BlurFade delay={BLUR_FADE_DELAY * 3 + yearIdx * 0.1}>
                <h2 className="text-xl font-bold mb-4">{year}</h2>
              </BlurFade>
              <div className="flex flex-col gap-4">
                {yearGroups[year].map((post, idx) => {
                  const slug = getPostSlug(post._meta.path);
                  return (
                    <BlurFade
                      key={slug}
                      delay={BLUR_FADE_DELAY * 4 + yearIdx * 0.1 + idx * 0.05}
                    >
                      <Link
                        href={`/blog/${slug}`}
                        className="group block rounded-2xl overflow-hidden border border-border transition-all duration-200 hover:shadow-md hover:border-border/80"
                      >
                        {/* Banner image or gradient placeholder */}
                        <div className="relative h-36 sm:h-40 bg-muted/60 overflow-hidden">
                          {post.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/30" />
                          )}
                          {/* Overlay content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                            <h3 className="text-white text-lg sm:text-xl font-bold leading-snug">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span className="text-white/50">|</span>
                              <span>{readingTime(post.content)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </BlurFade>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="flex items-center justify-center gap-4 mt-8">
                {pagination.hasPreviousPage ? (
                  <Link
                    href={`/blog?page=${pagination.page - 1}`}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    &lsaquo; Previous
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground/40">
                    &lsaquo; Previous
                  </span>
                )}

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <Link
                      key={num}
                      href={`/blog?page=${num}`}
                      className={`text-sm px-2.5 py-1 rounded-md transition-colors ${
                        num === pagination.page
                          ? "border border-border font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {num}
                    </Link>
                  )
                )}

                {pagination.hasNextPage ? (
                  <Link
                    href={`/blog?page=${pagination.page + 1}`}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Next &rsaquo;
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground/40">
                    Next &rsaquo;
                  </span>
                )}
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
