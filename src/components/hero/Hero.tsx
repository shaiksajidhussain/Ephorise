import Link from "next/link";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Arrow } from "@/components/ui/Arrow";

function CharLines({ lines }: { lines: string[] }) {
  let count = 0;
  return lines.map((line) => {
    const words = line.split(" ");
    const content = words.flatMap((word, wordIndex) => {
      const from = count;
      count += Array.from(word).length + (wordIndex < words.length - 1 ? 1 : 0);
      const node = (
        <span key={`${line}-${wordIndex}`} className="word">
          {Array.from(word).map((char, index) => (
            <span
              key={`${word}-${index}`}
              className="char"
              style={{ animationDelay: `${(from + index) * 0.045}s` }}
            >
              {char}
            </span>
          ))}
        </span>
      );
      return wordIndex === 0 ? [node] : [" ", node];
    });
    return (
      <span key={line} className="hero-line" aria-hidden="true">
        {content}
      </span>
    );
  });
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <HeroVisual />
      <div className="wrap relative z-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
          <p className="label">Ephorise</p>
          <p className="label flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            Websites, apps, and marketing
          </p>
        </div>
        <h1 id="home-title" className="display max-w-[14ch]" aria-label="Build Smarter. Grow Faster.">
          <CharLines lines={["Build Smarter.", "Grow Faster."]} />
        </h1>
        <p className="deck mt-6 max-w-xl">
          We help businesses turn ideas into digital experiences through modern websites, powerful
          applications, and result-driven digital marketing.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="btn btn-ghost">
            Explore Our Services
          </Link>
          <Link href="/contact" className="btn btn-solid">
            Let&apos;s Discuss Your Project
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
