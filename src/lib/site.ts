export const STUDIO = "Ephorise";

export const TAGLINE = "Build Smarter. Grow Faster.";

export const SITE_DESCRIPTION =
  "Ephorise helps businesses grow with professional website development, web and mobile applications, SEO, and digital marketing services.";

export const HOME_KEYWORDS = [
  "Website development company",
  "web application development",
  "mobile app development",
  "digital marketing agency",
];

export function siteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.endsWith(".local")
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export function publicEmail(): string | null {
  const email = process.env.NEXT_PUBLIC_PUBLIC_EMAIL?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) {
    return null;
  }
  return email;
}

export function publicPhone(): string | null {
  const phone = process.env.NEXT_PUBLIC_PUBLIC_PHONE?.trim() ?? "";
  if (!/^[0-9+().\-\s]{6,30}$/.test(phone)) return null;
  return phone;
}

export function publicWhatsapp(): string | null {
  const digits = (process.env.NEXT_PUBLIC_PUBLIC_WHATSAPP?.trim() ?? "").replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

export function publicLocation(): string | null {
  const location = process.env.NEXT_PUBLIC_PUBLIC_LOCATION?.trim() ?? "";
  if (location.length < 2 || location.length > 80) return null;
  return location;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work & Case Studies" },
  { href: "/about", label: "About Us" },
  { href: "/our-process", label: "Our Process" },
  { href: "/contact", label: "Contact Us" },
] as const;
