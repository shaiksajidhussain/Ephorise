"use client";

import { useEffect, useId, useRef, useState } from "react";

const themes = [
  {
    id: "studio",
    name: "Studio",
    swatches: [
      { name: "Navy", hex: "#080D18", tone: "light" },
      { name: "Iris", hex: "#536DFF", tone: "light" },
      { name: "Violet", hex: "#8B5CF6", tone: "light" },
    ],
  },
  {
    id: "lavender",
    name: "Lavender",
    swatches: [
      { name: "Lavender", hex: "#C8B3E8", tone: "dark" },
      { name: "Chartreuse", hex: "#D4FF3F", tone: "dark" },
      { name: "Tomato red", hex: "#E34234", tone: "light" },
    ],
  },
  {
    id: "ivory",
    name: "Ivory",
    swatches: [
      { name: "Warm ivory", hex: "#F9EBD7", tone: "dark" },
      { name: "Emerald", hex: "#046A38", tone: "light" },
      { name: "Vermilion", hex: "#E34222", tone: "light" },
    ],
  },
  {
    id: "signal",
    name: "Signal",
    swatches: [
      { name: "Jet black", hex: "#080808", tone: "light" },
      { name: "Hot pink", hex: "#FF2DAB", tone: "light" },
      { name: "Chartreuse", hex: "#D4FF3F", tone: "dark" },
    ],
  },
  {
    id: "obsidian",
    name: "Obsidian",
    swatches: [
      { name: "Obsidian black", hex: "#080808", tone: "light" },
      { name: "Chrome silver", hex: "#CDCBCB", tone: "dark" },
      { name: "Laser crimson", hex: "#D41514", tone: "light" },
    ],
  },
  {
    id: "cobalt",
    name: "Cobalt",
    swatches: [
      { name: "Electric cobalt", hex: "#0002CC", tone: "light" },
      { name: "Deep obsidian", hex: "#01000C", tone: "light" },
      { name: "Vibrant crimson", hex: "#BF032F", tone: "light" },
    ],
  },
  {
    id: "coral",
    name: "Coral",
    swatches: [
      { name: "Cool steel", hex: "#929DA7", tone: "dark" },
      { name: "Midnight charcoal", hex: "#17191C", tone: "light" },
      { name: "Coral orange", hex: "#FF4B32", tone: "light" },
    ],
  },
  {
    id: "orchid",
    name: "Orchid",
    swatches: [
      { name: "Pastel orchid", hex: "#E7B0DE", tone: "dark" },
      { name: "Eggplant", hex: "#400849", tone: "light" },
      { name: "Signal orange", hex: "#FF5A0A", tone: "light" },
    ],
  },
  {
    id: "sage",
    name: "Sage",
    swatches: [
      { name: "Muted sage", hex: "#A5A79B", tone: "dark" },
      { name: "Cream beige", hex: "#E8D2B5", tone: "dark" },
      { name: "Deep burgundy", hex: "#590907", tone: "light" },
    ],
  },
  {
    id: "glacier",
    name: "Glacier",
    swatches: [
      { name: "Glacier blue", hex: "#BFE9FF", tone: "dark" },
      { name: "Ultraviolet", hex: "#6F3DFF", tone: "light" },
      { name: "Mineral grey", hex: "#B7B7B7", tone: "dark" },
    ],
  },
  {
    id: "flora",
    name: "Flora",
    swatches: [
      { name: "Porcelain", hex: "#F3E6D7", tone: "dark" },
      { name: "Heather purple", hex: "#9B7ED6", tone: "dark" },
      { name: "Electric lemon", hex: "#E4FF3B", tone: "dark" },
    ],
  },
  {
    id: "forest",
    name: "Forest",
    swatches: [
      { name: "Charcoal black", hex: "#171717", tone: "light" },
      { name: "Forest green", hex: "#06110C", tone: "light" },
      { name: "Crimson red", hex: "#A31C1B", tone: "light" },
    ],
  },
  {
    id: "lemon",
    name: "Lemon",
    swatches: [
      { name: "Lemon", hex: "#FFF21A", tone: "dark" },
      { name: "Charcoal black", hex: "#171717", tone: "light" },
      { name: "Electric lavender", hex: "#A66BFF", tone: "light" },
    ],
  },
  {
    id: "mocha",
    name: "Mocha",
    swatches: [
      { name: "Mocha brown", hex: "#5B4632", tone: "light" },
      { name: "Champagne gold", hex: "#F4D9A0", tone: "dark" },
      { name: "Burnt amber", hex: "#C8792C", tone: "light" },
    ],
  },
] as const;

type ThemeId = (typeof themes)[number]["id"];

const storageKey = "ephorise-theme";

function isTheme(value: string | undefined): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export function ThemeDock() {
  const [theme, setTheme] = useState<ThemeId>("studio");
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState({ show: false, height: 20, top: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const boxId = useId();

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (isTheme(current)) setTheme(current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      const overflow = el.scrollHeight - el.clientHeight;
      const show = overflow > 1;
      const track = Math.max(el.clientHeight - 16, 1);
      const height = show ? Math.max(40, (el.clientHeight / el.scrollHeight) * track) : track;
      const top = show ? (el.scrollTop / overflow) * (track - height) : 0;
      setThumb({ show, height, top });
    };
    measure();
    const onWheel = (event: WheelEvent) => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      event.preventDefault();
      el.scrollTop = Math.min(max, Math.max(0, el.scrollTop + event.deltaY));
    };
    el.addEventListener("scroll", measure, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      el.removeEventListener("wheel", onWheel);
      observer.disconnect();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(id: ThemeId) {
    setTheme(id);
    if (id === "studio") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      /* storage can be blocked */
    }
    setOpen(false);
  }

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        type="button"
        className="theme-trigger"
        aria-expanded={open}
        aria-controls={boxId}
        onClick={() => setOpen((value) => !value)}
      >
        Themes
      </button>
      {open ? (
        <div className="theme-box" id={boxId}>
          <div
            className="theme-scroll"
            ref={listRef}
            role="group"
            aria-label="Color themes"
            tabIndex={0}
          >
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="theme-card"
                aria-pressed={theme === item.id}
                onClick={() => choose(item.id)}
              >
                <span className="theme-name">{item.name}</span>
                {item.swatches.map((swatch) => (
                  <span
                    key={swatch.hex}
                    className={`theme-swatch is-${swatch.tone}`}
                    style={{ background: swatch.hex }}
                  >
                    <span>{swatch.name}</span>
                    <span>{swatch.hex}</span>
                  </span>
                ))}
              </button>
            ))}
          </div>
          {thumb.show ? (
            <div
              className="theme-rail"
              aria-hidden="true"
              onPointerDown={(event) => {
                const list = listRef.current;
                const rail = event.currentTarget;
                if (!list) return;
                const scrollTo = (clientY: number) => {
                  const rect = rail.getBoundingClientRect();
                  const ratio = (clientY - rect.top) / rect.height;
                  const max = list.scrollHeight - list.clientHeight;
                  list.scrollTop = Math.min(max, Math.max(0, ratio * max));
                };
                scrollTo(event.clientY);
                const move = (pointer: PointerEvent) => scrollTo(pointer.clientY);
                const stop = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", stop);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", stop);
              }}
            >
              <div className="theme-thumb" style={{ height: thumb.height, top: thumb.top }} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
