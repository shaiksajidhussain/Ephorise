export function ServiceMark({ id }: { id: string }) {
  return (
    <svg className="service-mark" viewBox="0 0 72 72" aria-hidden="true">
      {id === "web-application-development" ? <AppMark /> : null}
      {id === "mobile-app-development" ? <PhoneMark /> : null}
      {id === "seo" ? <SearchMark /> : null}
      {id === "digital-marketing" ? <NodesMark /> : null}
      {id !== "web-application-development" &&
      id !== "mobile-app-development" &&
      id !== "seo" &&
      id !== "digital-marketing" ? (
        <SiteMark />
      ) : null}
    </svg>
  );
}

export function WorkMark({ index = 0 }: { index?: number }) {
  return (
    <svg className="work-mark" viewBox="0 0 120 80" aria-hidden="true" style={{ animationDelay: `${index * -0.6}s` }}>
      <rect className="mark-line" x="8" y="14" width="104" height="52" rx="8" />
      <path className="mark-line delay" d="M8 30h104" />
      <circle className="mark-dot" cx={28 + (index % 3) * 18} cy="22" r="3" />
      <path className="mark-draw" d="M22 56c14-16 28-16 42 0 10 12 24 8 34-6" />
    </svg>
  );
}

function SiteMark() {
  return (
    <>
      <rect className="mark-line" x="10" y="14" width="52" height="40" rx="6" />
      <path className="mark-line delay" d="M10 26h52" />
      <path className="mark-draw" d="M20 40h18M20 46h12" />
    </>
  );
}

function AppMark() {
  return (
    <>
      <rect className="mark-line" x="12" y="12" width="22" height="48" rx="4" />
      <rect className="mark-line delay" x="38" y="12" width="22" height="22" rx="4" />
      <rect className="mark-draw" x="38" y="38" width="22" height="22" rx="4" />
    </>
  );
}

function PhoneMark() {
  return (
    <>
      <rect className="mark-line" x="22" y="8" width="28" height="56" rx="6" />
      <path className="mark-line delay" d="M30 14h12" />
      <circle className="mark-dot" cx="36" cy="56" r="2" />
    </>
  );
}

function SearchMark() {
  return (
    <>
      <circle className="mark-line" cx="32" cy="32" r="16" />
      <path className="mark-draw" d="M44 44l12 12" />
      <path className="mark-line delay" d="M24 32h16" />
    </>
  );
}

function NodesMark() {
  return (
    <>
      <circle className="mark-dot" cx="18" cy="40" r="4" />
      <circle className="mark-dot delay" cx="36" cy="22" r="4" />
      <circle className="mark-dot" cx="54" cy="44" r="4" />
      <path className="mark-draw" d="M18 40 L36 22 L54 44" />
    </>
  );
}
