import Link from "next/link";
import { Suspense } from "react";
import { NavCurrent } from "@/components/layout/NavCurrent";
import { STUDIO, navLinks } from "@/lib/site";

function Links({ className, linkClass }: { className: string; linkClass: string }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link className={linkClass} data-nav href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" className="text-[1.15rem] font-medium tracking-[-0.04em]" aria-label={`${STUDIO}, home`}>
          {STUDIO}
        </Link>
        <nav className="hidden xl:block" aria-label="Primary">
          <Links className="flex items-center gap-5" linkClass="nav-link" />
        </nav>
        <details className="site-menu xl:hidden">
          <summary className="menu-summary">
            <span className="when-closed">Menu</span>
            <span className="when-open">Close</span>
          </summary>
          <div className="menu-panel" role="dialog" aria-label="Primary">
            <nav aria-label="Mobile">
              <Links className="flex flex-col" linkClass="menu-link" />
            </nav>
          </div>
        </details>
      </div>
      <Suspense fallback={null}>
        <NavCurrent />
      </Suspense>
    </header>
  );
}
