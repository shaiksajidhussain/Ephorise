"use client";

import { useEffect, useRef, useState } from "react";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import { scrollToY } from "@/components/motion/scroll";
import { StageRecord } from "@/components/process/StageRecord";
import { processSteps } from "@/data/process";

const STEP_COUNT = processSteps.length;

export function ProcessStory({
  heading = "h2",
  showTitle = true,
}: {
  heading?: "h1" | "h2";
  showTitle?: boolean;
}) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTriggerType | null>(null);
  const step = processSteps[active];
  const Title = heading;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = window.matchMedia("(min-width: 840px) and (prefers-reduced-motion: no-preference)");
    let cancel = () => {};

    const mount = () => {
      cancel();
      cancel = () => {};
      triggerRef.current = null;
      if (!media.matches) return;

      let alive = true;
      let trigger: ScrollTriggerType | null = null;
      let frame = 0;
      let shown = 0;
      let from = 0;
      let to = 0;

      const apply = (value: number) => {
        const scaled = Math.min(STEP_COUNT - 1, Math.max(0, value));
        const index = Math.min(STEP_COUNT - 1, Math.floor(scaled));
        const next = Math.min(STEP_COUNT - 1, index + 1);
        const mix = index === next ? 0 : scaled - index;
        const leaving = index === next ? 1 : Math.max(0, 1 - mix / 0.42);
        const arriving = index === next ? 0 : Math.max(0, (mix - 0.38) / 0.62);
        const layers = stackRef.current?.children;
        if (layers) {
          for (let i = 0; i < layers.length; i += 1) {
            const layer = layers[i] as HTMLElement;
            const opacity = i === index ? leaving : i === next ? arriving : 0;
            layer.style.opacity = opacity.toFixed(3);
            const shift = i === index ? mix : i === next ? mix - 1 : 0;
            layer.style.transform = `translate3d(0, ${(shift * 8).toFixed(2)}px, 0)`;
          }
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${(((scaled + 1) / STEP_COUNT) * 100).toFixed(2)}%`;
        }
        const nearest = Math.round(scaled);
        if (nearest !== shown) {
          shown = nearest;
          setActive(nearest);
        }
      };

      const glide = () => {
        frame = 0;
        from += (to - from) * 0.16;
        if (Math.abs(to - from) < 0.004) from = to;
        else frame = requestAnimationFrame(glide);
        apply(from);
      };

      void (async () => {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (!alive) return;
        gsap.registerPlugin(ScrollTrigger);

        const headerOffset = () => {
          const header = document.querySelector(".site-header");
          return header ? Math.round(header.getBoundingClientRect().height) : 72;
        };

        root.classList.add("is-pinned-story");
        trigger = ScrollTrigger.create({
          trigger: root,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${Math.round(window.innerHeight * 0.7) * (STEP_COUNT - 1)}`,
          pin: true,
          pinType: "fixed",
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate(self) {
            to = self.progress * (STEP_COUNT - 1);
            if (!frame) frame = requestAnimationFrame(glide);
          },
        });
        triggerRef.current = trigger;
        to = trigger.progress * (STEP_COUNT - 1);
        from = to;
        apply(from);
        ScrollTrigger.refresh();
      })();

      cancel = () => {
        alive = false;
        root.classList.remove("is-pinned-story");
        if (frame) cancelAnimationFrame(frame);
        stackRef.current?.querySelectorAll<HTMLElement>(".stage-layer").forEach((layer) => {
          layer.style.opacity = "";
          layer.style.transform = "";
        });
        if (progressRef.current) progressRef.current.style.width = "";
        trigger?.kill();
        triggerRef.current = null;
      };
    };

    mount();
    media.addEventListener("change", mount);
    return () => {
      media.removeEventListener("change", mount);
      cancel();
    };
  }, []);

  useEffect(() => {
    if (triggerRef.current || !progressRef.current) return;
    progressRef.current.style.width = `${((active + 1) / STEP_COUNT) * 100}%`;
  }, [active]);

  function choose(index: number) {
    const trigger = triggerRef.current;
    if (!trigger) {
      setActive(index);
      return;
    }
    const span = trigger.end - trigger.start;
    scrollToY(trigger.start + span * (index / (STEP_COUNT - 1)));
  }

  return (
    <div className="stage-pin" ref={rootRef}>
      <div className="stage-board">
        <div className="stage-copy">
          {showTitle ? (
            <>
              <p className="stage-pill">
                <span className="status-dot" aria-hidden="true" />
                Six stages
              </p>
              <Title className="stage-display">
                A Clear Process.
                <br />A Shared Vision.
              </Title>
            </>
          ) : null}
          <ol className="stage-list">
            {processSteps.map((item, index) => {
              const selected = index === active;
              return (
                <li key={item.index} className={selected ? "is-open" : undefined}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-controls="stage-record"
                    onClick={() => choose(index)}
                  >
                    <span className="label">{item.index}</span>
                    <span>{item.title}</span>
                  </button>
                  <div className="stage-detail">
                    <p className="text-paper">{item.summary}</p>
                    <p className="deck mt-3">{item.detail}</p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="stage-progress-label">
            Stage {step.index} of {String(STEP_COUNT).padStart(2, "0")}
          </p>
          <div
            className="stage-progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={6}
            aria-valuenow={active + 1}
            aria-valuetext={`Stage ${step.index} of 06, ${step.title}`}
          >
            <span ref={progressRef} />
          </div>
        </div>
        <div className="stage-stack lg:self-start" id="stage-record" ref={stackRef}>
          {processSteps.map((item, index) => (
            <div key={item.index} className={index === active ? "stage-layer is-front" : "stage-layer"} aria-hidden={index !== active}>
              <StageRecord step={item} live={index === active} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
