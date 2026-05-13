import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { getAllEntries, supportCategories } from "@/lib/support-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/locations`, lastModified: new Date() },
    { url: `${baseUrl}/browse-support`, lastModified: new Date() },
    { url: `${baseUrl}/support-checker`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/accessibility`, lastModified: new Date() },
    { url: `${baseUrl}/guides`, lastModified: new Date() },
    { url: `${baseUrl}/how-we-choose-sources`, lastModified: new Date() },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.updated),
    })),
    ...supportCategories.map((category) => ({
      url: `${baseUrl}/browse-support/${category.id}`,
      lastModified: new Date(),
    })),
    ...getAllEntries().map((entry) => ({
      url: `${baseUrl}/locations/${entry.slug}`,
      lastModified: entry.lastChecked ? new Date(entry.lastChecked) : new Date(),
    })),
  ];
}
