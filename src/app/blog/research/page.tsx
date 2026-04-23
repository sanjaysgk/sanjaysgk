import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "My research interests and publications in bioinformatics, computational biology, and computer science.",
};

const BLUR_FADE_DELAY = 0.04;

const RESEARCH_INTERESTS = [
  {
    title: "Computational Genomics",
    description:
      "Developing algorithms and pipelines for genomic data analysis, variant calling, and genome assembly.",
  },
  {
    title: "Immunoinformatics",
    description:
      "Computational approaches to understanding immune system responses, epitope prediction, and vaccine design.",
  },
  {
    title: "Machine Learning in Biology",
    description:
      "Applying deep learning and statistical methods to biological data for discovery and prediction.",
  },
  {
    title: "Data Engineering",
    description:
      "Building scalable bioinformatics pipelines with Nextflow, Snakemake, and cloud computing.",
  },
];

export default function ResearchPage() {
  const posts = [...allPosts]
    .filter((p) => p.category === "research")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    );

  return (
    <section className="max-w-2xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            Research
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            My research interests and publications in bioinformatics,
            computational biology, and computer science.
          </p>
        </div>
      </BlurFade>

      {/* Research Interests */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h2 className="text-xl font-semibold mb-4">Research Interests</h2>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {RESEARCH_INTERESTS.map((interest, idx) => (
          <BlurFade key={interest.title} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
            <div className="rounded-xl border border-border p-5 h-full">
              <h3 className="font-semibold mb-1.5">{interest.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {interest.description}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Publications */}
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="text-xl font-semibold mb-4">Publications</h2>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <div className="flex flex-col gap-4 mb-8">
          <div className="rounded-xl border border-border p-5">
            <h3 className="font-semibold">CAN-IMMUNE</h3>
            <p className="text-sm text-muted-foreground mt-1">
              A comprehensive cancer neoantigen database documenting 1.2M+ mutant peptides across 33 cancer types. <span className="italic">Manuscript in preparation, 2026.</span>
            </p>
            <Link href="https://canelib.erc.monash.edu/index" target="_blank" className="text-sm text-primary underline underline-offset-2 mt-2 inline-block">
              Platform
            </Link>
          </div>
          <div className="rounded-xl border border-border p-5">
            <h3 className="font-semibold">Immunolyser</h3>
            <p className="text-sm text-muted-foreground mt-1">
              An automated web-based immunopeptidomics analysis pipeline. Published in <span className="italic">Computational and Structural Biotechnology Journal</span>, 2025.
            </p>
            <div className="flex gap-3 mt-2">
              <Link href="https://spj.science.org/doi/10.1016/j.csbj.2025.10.007" target="_blank" className="text-sm text-primary underline underline-offset-2">
                Paper
              </Link>
              <Link href="https://immunolyser.erc.monash.edu/" target="_blank" className="text-sm text-primary underline underline-offset-2">
                Platform
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Research Posts */}
      {posts.length > 0 && (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-semibold mb-4">Research Posts</h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {posts.map((post, idx) => {
              const slug = post._meta.path.replace(/\/index\.mdx$|\.mdx$/, "");
              return (
                <BlurFade key={slug} delay={BLUR_FADE_DELAY * 8 + idx * 0.05}>
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
        </>
      )}
    </section>
  );
}
