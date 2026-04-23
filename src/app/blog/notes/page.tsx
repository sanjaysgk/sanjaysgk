import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { getPostSlug } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Notes",
  description: "My notes on computational biology, bioinformatics, HPC, and building products.",
};

const BLUR_FADE_DELAY = 0.04;

const NOTE_TOPICS = [
  {
    slug: "computational-biology",
    title: "Computational Biology",
    description: "Genomics, proteomics, cancer neoantigen discovery, and computational pipelines.",
    tags: ["bioinformatics", "cancer", "immunopeptidomics"],
    image: "/canimmune.png",
  },
  {
    slug: "hpc-workflows",
    title: "HPC & Workflows",
    description: "SLURM, Nextflow, Snakemake, and running pipelines on compute clusters.",
    tags: ["hpc", "tutorial"],
    image: null,
  },
  {
    slug: "building-products",
    title: "Building Products",
    description: "Lessons from shipping Scrollpaper, LabScrib, and side projects.",
    tags: ["product", "react-native", "startup"],
    image: null,
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    description: "Deep learning, NLP, and applying ML to biological data.",
    tags: ["ml", "python"],
    image: null,
  },
];

export default function NotesPage() {
  const allNotes = [...allPosts]
    .filter((p) => p.category === "notes")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    );

  // Count posts per topic by matching tags
  function getTopicPostCount(topicTags: string[]): number {
    return allNotes.filter((post) =>
      (post.tags ?? []).some((t) => topicTags.includes(t))
    ).length;
  }

  return (
    <section className="max-w-2xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Breadcrumbs
          items={[{ label: "Notes", icon: "page" }]}
          className="mb-6"
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Notes
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            My notes on computational biology, bioinformatics, HPC, and building products.
          </p>
        </div>
      </BlurFade>

      {/* Topic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {NOTE_TOPICS.map((topic, idx) => {
          const count = getTopicPostCount(topic.tags);
          return (
            <BlurFade key={topic.slug} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
              <Link
                href={`/blog/tags/${topic.tags[0]}`}
                className="group block rounded-xl border border-border overflow-hidden transition-all duration-200 hover:shadow-md hover:border-border/80"
              >
                {/* Image or gradient */}
                <div className="h-28 bg-gradient-to-br from-muted to-muted/40 overflow-hidden">
                  {topic.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="size-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {topic.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <BookOpen className="size-3" />
                    <span>{count} {count === 1 ? "post" : "posts"}</span>
                  </div>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>

      {/* All Notes List */}
      {allNotes.length > 0 && (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold mb-4">All Notes</h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {allNotes.map((post, idx) => {
              const slug = getPostSlug(post._meta.path);
              return (
                <BlurFade key={slug} delay={BLUR_FADE_DELAY * 6 + idx * 0.05}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex items-start gap-3 p-4 rounded-xl border border-border transition-colors hover:bg-muted/50"
                  >
                    <BookOpen className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm group-hover:text-foreground transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {post.summary}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
