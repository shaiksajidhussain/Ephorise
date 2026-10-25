import Link from "next/link";
import { services } from "@/data/services";
import { STUDIO, TAGLINE, navLinks, publicEmail, publicLocation, publicPhone } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
] as const;

export function Footer() {
  const email = publicEmail();
  const phone = publicPhone();
  const location = publicLocation();

  return (
    <footer className="relative z-[1] border-t border-line">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-2xl font-medium tracking-[-0.04em]">{STUDIO}</p>
          <p className="mt-3 text-paper">{TAGLINE}</p>
          <p className="deck mt-4">
            Ephorise helps businesses build their digital presence through website development, web and mobile
            applications, SEO, and digital marketing.
          </p>
          {email ? (
            <a className="mt-6 inline-flex text-paper underline decoration-white/20 underline-offset-4" href={`mailto:${email}`}>
              {email}
            </a>
          ) : null}
          {phone ? <p className="mt-2 text-sm text-paper">{phone}</p> : null}
          {location ? <p className="mt-2 text-sm text-mute">{location}</p> : null}
        </div>
        <div className="md:col-span-3">
          <p className="label">Quick Links</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="label">Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <Link className="nav-link" href={`/services/${service.id}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-line py-6 text-sm text-mute">
        <p>© 2026 {STUDIO}. All rights reserved.</p>
      </div>
    </footer>
  );
}
