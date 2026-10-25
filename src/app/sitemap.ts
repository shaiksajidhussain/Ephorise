import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteUrl();
  if (!site) return [];

  const paths = [
    "/",
    "/services",
    ...services.map((service) => `/services/${service.id}`),
    "/our-work",
    "/about",
    "/our-process",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${site}${path === "/" ? "" : path}`,
    lastModified: "2026-10-25",
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
