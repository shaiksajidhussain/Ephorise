"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/our-work") return pathname === "/our-work" || pathname.startsWith("/our-work/");
  if (href === "/services") return pathname === "/services" || pathname.startsWith("/services/");
  return pathname === href;
}

export function NavCurrent() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((link) => {
      const href = link.getAttribute("href") ?? "";
      if (isCurrent(pathname, href)) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.querySelectorAll("details.site-menu").forEach((node) => {
      (node as HTMLDetailsElement).open = false;
    });
  }, [pathname]);

  useEffect(() => {
    const menu = document.querySelector("details.site-menu");
    if (!menu) return;

    const onToggle = () => {
      document.body.style.overflow = (menu as HTMLDetailsElement).open ? "hidden" : "";
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") (menu as HTMLDetailsElement).open = false;
    };

    menu.addEventListener("toggle", onToggle);
    document.addEventListener("keydown", onKey);
    return () => {
      menu.removeEventListener("toggle", onToggle);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
