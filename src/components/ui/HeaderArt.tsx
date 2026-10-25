export function HeaderArt({ kind }: { kind: "services" | "work" | "about" | "process" }) {
  return (
    <div className="header-art" aria-hidden="true">
      {kind === "services" ? <ServicesPlate /> : null}
      {kind === "work" ? <WorkPlate /> : null}
      {kind === "about" ? <AboutPlate /> : null}
      {kind === "process" ? <ProcessPlate /> : null}
    </div>
  );
}

function ServicesPlate() {
  return (
    <svg viewBox="0 0 560 460" className="header-art-svg">
      <rect x="78" y="28" width="400" height="286" rx="20" className="plate-ghost" />
      <rect x="36" y="64" width="392" height="292" rx="18" className="plate-fill" />
      <path d="M36 112h392" className="plate-line" />
      <circle cx="64" cy="88" r="5" className="plate-dot" />
      <circle cx="84" cy="88" r="5" className="plate-ring" />
      <circle cx="104" cy="88" r="5" className="plate-line" />
      <rect x="132" y="80" width="168" height="16" rx="8" className="plate-line" />
      <rect x="64" y="140" width="168" height="14" rx="7" className="plate-paper" />
      <rect x="64" y="166" width="220" height="8" rx="4" className="plate-mute" />
      <rect x="64" y="184" width="180" height="8" rx="4" className="plate-mute" />
      <rect x="64" y="220" width="156" height="100" rx="12" className="plate-accent" />
      <path d="M88 268h108" className="plate-paper" />
      <path d="M88 286h72" className="plate-mute" />
      <rect x="236" y="220" width="160" height="46" rx="12" className="plate-violet" />
      <rect x="236" y="274" width="160" height="46" rx="12" className="plate-line" />
      <rect x="348" y="28" width="176" height="78" rx="16" className="plate-fill" />
      <path d="M372 56h128" className="plate-accent mark-draw" />
      <path d="M372 76h84" className="plate-mute" />
      <circle cx="468" cy="318" r="46" className="plate-ring" />
      <path d="M468 292v18h16" className="plate-accent" />
    </svg>
  );
}

function WorkPlate() {
  return (
    <svg viewBox="0 0 560 460" className="header-art-svg">
      <rect x="48" y="168" width="250" height="196" rx="16" className="plate-ghost" />
      <rect x="168" y="48" width="250" height="196" rx="16" className="plate-fill" />
      <path d="M168 96h250" className="plate-line" />
      <rect x="192" y="120" width="96" height="92" rx="10" className="plate-accent" />
      <rect x="304" y="120" width="86" height="40" rx="8" className="plate-violet" />
      <rect x="304" y="172" width="86" height="40" rx="8" className="plate-line" />
      <rect x="92" y="212" width="214" height="168" rx="16" className="plate-fill" />
      <path d="M92 258h214" className="plate-line" />
      <path d="M120 300h70" className="plate-paper" />
      <path d="M120 322h150" className="plate-mute" />
      <path d="M120 340h120" className="plate-mute" />
      <rect x="292" y="196" width="214" height="188" rx="16" className="plate-fill" />
      <circle cx="360" cy="286" r="42" className="plate-ring" />
      <path d="M360 258v28l18 12" className="plate-accent mark-draw" />
      <path d="M422 260h56" className="plate-paper" />
      <path d="M422 282h40" className="plate-mute" />
      <path d="M422 332h64" className="plate-violet" />
    </svg>
  );
}

function AboutPlate() {
  return (
    <svg viewBox="0 0 560 460" className="header-art-svg">
      <circle cx="286" cy="230" r="168" className="plate-ghost" />
      <circle cx="286" cy="230" r="112" className="plate-ring" />
      <circle cx="286" cy="230" r="8" className="plate-dot" />
      <path d="M286 78v36M286 346v36M118 230h36M418 230h36" className="plate-line" />
      <path d="M174 118l22 22M376 320l22 22M376 140l-22 22M196 342l-22 22" className="plate-mute" />
      <rect x="214" y="168" width="144" height="124" rx="16" className="plate-fill" />
      <path d="M238 204h96" className="plate-paper" />
      <path d="M238 226h72" className="plate-accent mark-draw" />
      <path d="M238 248h84" className="plate-mute" />
      <circle cx="430" cy="128" r="28" className="plate-violet" />
      <circle cx="150" cy="332" r="18" className="plate-accent" />
    </svg>
  );
}

function ProcessPlate() {
  return (
    <svg viewBox="0 0 560 460" className="header-art-svg">
      <rect x="86" y="28" width="360" height="392" rx="20" className="plate-ghost" />
      <rect x="40" y="56" width="348" height="348" rx="18" className="plate-fill" />
      <path d="M112 108v248" className="plate-line" />
      <circle cx="112" cy="112" r="9" className="plate-dot" />
      <circle cx="112" cy="174" r="9" className="plate-ring" />
      <circle cx="112" cy="236" r="11" className="plate-accent" />
      <circle cx="112" cy="298" r="9" className="plate-violet" />
      <circle cx="112" cy="356" r="9" className="plate-ring" />
      <path d="M148 112h108" className="plate-paper" />
      <path d="M148 174h156" className="plate-mute" />
      <rect x="148" y="214" width="204" height="44" rx="12" className="plate-accent" />
      <path d="M170 236h92" className="plate-paper" />
      <path d="M148 298h128" className="plate-mute" />
      <path d="M148 356h76" className="plate-paper" />
      <path d="M112 112v244" className="plate-accent mark-draw" />
      <rect x="328" y="36" width="192" height="112" rx="16" className="plate-fill" />
      <path d="M352 72h144" className="plate-paper" />
      <path d="M352 96h104" className="plate-mute" />
      <path d="M352 118h72" className="plate-violet" />
      <circle cx="452" cy="332" r="50" className="plate-ring" />
      <path d="M426 332l18 18 34-40" className="plate-accent" />
    </svg>
  );
}
