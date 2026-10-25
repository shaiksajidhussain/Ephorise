"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/components/motion/scroll";

export function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let alive = true;
    let destroy = () => {};

    void (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!alive) return;

      gsap.registerPlugin(ScrollTrigger);
      if (!window.location.hash) window.scrollTo(0, 0);
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
        autoRaf: false,
      });
      if (!window.location.hash) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      setLenis(lenis);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("main h2, main h1.stage-display").forEach((element) => {
          const chars = splitChars(element);
          gsap.fromTo(
            chars,
            { autoAlpha: 0, filter: "blur(12px)", y: 10 },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.028,
              clearProps: "filter",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".preview-media").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 28, autoAlpha: 0, filter: "blur(16px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power2.out",
              clearProps: "filter",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            },
          );
        });

        const scene = document.querySelector(".hero-visual canvas, .hero-visual .fold");
        if (scene) {
          gsap.to(scene, {
            y: 64,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      destroy = () => {
        context.revert();
        gsap.ticker.remove(tick);
        setLenis(null);
        lenis.destroy();
      };
    })();

    return () => {
      alive = false;
      destroy();
    };
  }, [pathname]);

  return null;
}

function splitChars(element: HTMLElement) {
  if (element.dataset.chars === "true") {
    return Array.from(element.querySelectorAll<HTMLElement>(".char"));
  }
  element.dataset.chars = "true";
  const label = element.innerText.replace(/\s+/g, " ").trim();
  if (!element.getAttribute("aria-label")) element.setAttribute("aria-label", label);

  const pieces: Node[] = [];
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = (node.textContent ?? "").trim().split(/\s+/).filter(Boolean);
      words.forEach((word, index) => {
        if (pieces.length > 0 && pieces[pieces.length - 1]?.nodeName !== "BR" && index === 0) {
          pieces.push(document.createTextNode(" "));
        } else if (index > 0) {
          pieces.push(document.createTextNode(" "));
        }
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";
        wordSpan.setAttribute("aria-hidden", "true");
        for (const char of Array.from(word)) {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char;
          wordSpan.append(span);
        }
        pieces.push(wordSpan);
      });
      return;
    }
    if (node.nodeName === "BR") {
      pieces.push(document.createElement("br"));
      return;
    }
    pieces.push(node.cloneNode(true));
  });
  element.replaceChildren(...pieces);
  return Array.from(element.querySelectorAll<HTMLElement>(".char"));
}
