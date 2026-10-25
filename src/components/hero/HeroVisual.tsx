"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SculptureFallback } from "@/components/hero/SculptureFallback";

const Sculpture = dynamic(() => import("@/components/hero/Sculpture"), { ssr: false });

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 720px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnhanced(media.matches && canUseWebGL());
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    sync();
    onVisibility();
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enhanced) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enhanced]);

  return (
    <div ref={ref} className="hero-visual" aria-hidden="true">
      {enhanced ? <Sculpture active={inView && visible} /> : <SculptureFallback />}
    </div>
  );
}
