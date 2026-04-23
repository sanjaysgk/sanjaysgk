import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { formatDate, readingTime, getPostSlug } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostNavigation } from "@/components/blog/post-navigation";
import { TOCSidebar } from "@/components/blog/toc-sidebar";
import { ScrollToTop } from "@/components/blog/scroll-to-top";
import Link from "next/link";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: getPostSlug(post._meta.path),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  if (!post) return {};

  const { title, summary, publishedAt, image } = post;
  const ogImage = image || `${DATA.url}/blog/${slug}/opengraph-image`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${DATA.url}/blog/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
    },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/`(.+?)`/g, "$1");
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ depth: match[1].length, text, slug });
  }
  return headings;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sortedPosts = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  const postIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  if (postIndex === -1) notFound();

  const post = sortedPosts[postIndex];
  const newerPost = postIndex > 0 ? sortedPosts[postIndex - 1] : undefined;
  const olderPost =
    postIndex < sortedPosts.length - 1
      ? sortedPosts[postIndex + 1]
      : undefined;

  const headings = extractHeadings(post.content);

  const navProps = {
    newer: newerPost
      ? { slug: newerPost._meta.path.replace(/\.mdx$/, ""), title: newerPost.title }
      : undefined,
    older: olderPost
      ? { slug: olderPost._meta.path.replace(/\.mdx$/, ""), title: olderPost.title }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            description: post.summary,
            image: post.image || `${DATA.url}/blog/${slug}/opengraph-image`,
            url: `${DATA.url}/blog/${slug}`,
            author: { "@type": "Person", name: DATA.name },
          }),
        }}
      />

      <div className="flex gap-12">
        {/* Left sidebar TOC — hidden below lg */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0">
            <TOCSidebar headings={headings} />
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-2xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: post.title }]} />

          {/* Post Header */}
          <header className="mt-8 flex flex-col gap-y-3">
            <h1
              id="post-title"
              className="scroll-mt-20 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl"
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              <Separator orientation="vertical" className="h-3.5" />
              <span>{readingTime(post.content)}</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <Separator orientation="vertical" className="h-3.5" />
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog/tags/${tag}`}>
                        <Badge
                          variant="outline"
                          className="text-[11px] px-1.5 py-0 h-5 hover:bg-muted transition-colors cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Decorative line */}
          <div
            className="my-6 h-px bg-border"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* Article */}
          <article className="prose max-w-none">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </article>

          {/* Bottom Navigation */}
          <PostNavigation {...navProps} className="mt-12 pt-8 border-t border-border" />
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}
