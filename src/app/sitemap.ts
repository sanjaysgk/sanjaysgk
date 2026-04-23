import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = allPosts.map((post) => ({
    url: `${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  return [
    {
      url: DATA.url,
      lastModified: new Date(),
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: new Date(),
    },
    ...blogPosts,
  ];
}
