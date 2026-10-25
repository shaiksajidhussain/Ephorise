import type { Metadata } from "next";
import { HOME_KEYWORDS, SITE_DESCRIPTION, STUDIO, siteUrl } from "@/lib/site";

const SHARE_ALT = `${STUDIO}. Build Smarter. Grow Faster.`;

type PageMetaInput = {
  title: string;
  description?: string;
  path: string;
  absolute?: boolean;
  canonical?: boolean;
  keywords?: string[];
};

export function pageMeta({
  title,
  description = SITE_DESCRIPTION,
  path,
  absolute = false,
  canonical = true,
  keywords,
}: PageMetaInput): Metadata {
  const site = siteUrl();
  const fullTitle = absolute ? title : `${title} — ${STUDIO}`;
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const image = site
    ? [{ url: `${site}/og`, width: 1200, height: 630, alt: SHARE_ALT }]
    : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: canonical ? { canonical: pathname } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      siteName: STUDIO,
      url: site ? `${site}${pathname === "/" ? "" : pathname}` : undefined,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image?.map((item) => item.url),
    },
  };
}

export function rootMetadata(): Metadata {
  const site = siteUrl();
  return {
    ...(site ? { metadataBase: new URL(site) } : {}),
    ...pageMeta({
      title: "Ephorise | Website Development, Apps & Digital Marketing",
      description: SITE_DESCRIPTION,
      path: "/",
      absolute: true,
      keywords: [...HOME_KEYWORDS],
    }),
    applicationName: STUDIO,
    robots: { index: true, follow: true },
  };
}
