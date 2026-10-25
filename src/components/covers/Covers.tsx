import type { ReactNode } from "react";

type CoverProps = { className?: string };

function Frame({ className, children }: CoverProps & { children: ReactNode }) {
  return (
    <svg
      className={className ?? "block h-full w-full"}
      viewBox="0 0 1600 1000"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  );
}

export function NorthlineCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#101827" />
      <polygon points="0,1000 920,0 1600,0 1600,1000" fill="#080D18" />
      <path d="M140 760 C 360 760 420 220 700 220 S 1080 640 1360 360" fill="none" stroke="#536DFF" strokeWidth="6" />
      {[
        [140, 760, "Origin"],
        [700, 220, "Handoff"],
        [1360, 360, "Arrival"],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <circle cx={Number(x)} cy={Number(y)} r="16" fill="#080D18" stroke="#F7F9FC" strokeWidth="3" />
          <text x={Number(x) + 28} y={Number(y) + 8} fill="#A6B0C2" fontSize="22" fontFamily="ui-monospace, monospace">
            {label}
          </text>
        </g>
      ))}
      <text x="80" y="140" fill="#A6B0C2" fontSize="22" fontFamily="ui-monospace, monospace" letterSpacing="6">
        FREIGHT STUDY
      </text>
      <text x="80" y="900" fill="#F7F9FC" fontSize="120" fontFamily="sans-serif" letterSpacing="-4">
        Northline
      </text>
    </Frame>
  );
}

export function HarborCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#0c1422" />
      {[240, 420, 640, 900, 1180].map((radius, index) => (
        <circle
          key={radius}
          cx="80"
          cy="1040"
          r={radius}
          fill="none"
          stroke={index === 3 ? "#536DFF" : "rgb(247 249 252 / 0.22)"}
          strokeWidth={index === 3 ? 4 : 1.5}
        />
      ))}
      <text x="100" y="180" fill="#A6B0C2" fontSize="22" fontFamily="ui-monospace, monospace" letterSpacing="6">
        PRACTICE WORKSPACE
      </text>
      <text x="100" y="340" fill="#F7F9FC" fontSize="128" fontFamily="sans-serif" letterSpacing="-4">
        Harbor
      </text>
    </Frame>
  );
}

export function FieldnoteCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#101827" />
      <text x="80" y="220" fill="#A6B0C2" fontSize="22" fontFamily="ui-monospace, monospace" letterSpacing="6">
        SITE RECORD
      </text>
      <text x="80" y="390" fill="#F7F9FC" fontSize="110" fontFamily="sans-serif" letterSpacing="-4">
        Fieldnote
      </text>
      <rect x="980" y="80" width="460" height="840" fill="#080D18" stroke="rgb(247 249 252 / 0.4)" strokeWidth="2" />
      {["Visit", "Photos", "Exception", "Summary", "Sign-off"].map((item, row) => (
        <g key={item}>
          <rect x="1040" y={180 + row * 130} width="36" height="36" fill={row === 2 ? "#536DFF" : "none"} stroke="#F7F9FC" strokeWidth="2" />
          <text x="1100" y={208 + row * 130} fill="#F7F9FC" fontSize="32" fontFamily="sans-serif">
            {item}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function LumenCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#070b14" />
      <defs>
        <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F7F9FC" stopOpacity="0.05" />
          <stop offset="0.4" stopColor="#536DFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#536DFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="740" y="0" width="120" height="1000" fill="url(#beam)" />
      <ellipse cx="800" cy="390" rx="260" ry="36" fill="none" stroke="#F7F9FC" strokeWidth="3" />
      <ellipse cx="800" cy="470" rx="180" ry="22" fill="none" stroke="#536DFF" strokeWidth="3" />
      <text x="80" y="880" fill="#F7F9FC" fontSize="128" fontFamily="sans-serif" letterSpacing="-4">
        Lumen
      </text>
      <text x="80" y="180" fill="#A6B0C2" fontSize="22" fontFamily="ui-monospace, monospace" letterSpacing="6">
        OBJECT STUDY
      </text>
    </Frame>
  );
}

export function KineticCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#101827" />
      {[
        [280, 1280],
        [400, 860],
        [520, 1460, true],
        [640, 1040],
        [760, 680],
      ].map(([y, width, accent]) => (
        <rect
          key={String(y)}
          x="80"
          y={Number(y)}
          width={Number(width)}
          height="48"
          fill={accent ? "#536DFF" : "rgb(247 249 252 / 0.14)"}
        />
      ))}
      <text x="80" y="180" fill="#F7F9FC" fontSize="120" fontFamily="sans-serif" letterSpacing="-4">
        Kinetic
      </text>
    </Frame>
  );
}

export function LedgerCover(props: CoverProps) {
  return (
    <Frame {...props}>
      <rect width="1600" height="1000" fill="#0c1322" />
      {Array.from({ length: 6 }).map((_, index) => (
        <g key={index}>
          <line
            x1="80"
            x2="1520"
            y1={280 + index * 100}
            y2={280 + index * 100}
            stroke="rgb(247 249 252 / 0.12)"
          />
          {index === 2 ? <rect x="80" y={280 + index * 100} width="1520" height="100" fill="rgb(83 109 255 / 0.16)" /> : null}
          <text
            x="120"
            y={340 + index * 100}
            fill="#A6B0C2"
            fontSize="24"
            fontFamily="ui-monospace, monospace"
          >
            {`REF-0${index + 1}`}
          </text>
          <text x="1100" y={340 + index * 100} fill="#F7F9FC" fontSize="24" fontFamily="sans-serif">
            {index === 2 ? "Exception" : index % 2 ? "Scheduled" : "Open"}
          </text>
        </g>
      ))}
      <text x="80" y="180" fill="#F7F9FC" fontSize="92" fontFamily="sans-serif" letterSpacing="-3">
        Ledger
      </text>
    </Frame>
  );
}

const covers = {
  northline: NorthlineCover,
  harbor: HarborCover,
  fieldnote: FieldnoteCover,
  lumen: LumenCover,
  kinetic: KineticCover,
  ledger: LedgerCover,
};

export function Cover({ id, className }: { id: string; className?: string }) {
  const Selected = covers[id as keyof typeof covers] ?? NorthlineCover;
  return <Selected className={className} />;
}
