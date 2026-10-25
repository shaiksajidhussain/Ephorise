import type { ReactNode } from "react";

function Browser({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span className="ml-2">{label}</span>
      </div>
      <div className="study-screen">{children}</div>
    </div>
  );
}

function Phone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone-bar">
        <i />
        <span>{label}</span>
      </div>
      <div className="study-screen">{children}</div>
    </div>
  );
}

function NorthlineStudy() {
  return (
    <Browser label="Northline study">
      <p className="label">Coverage</p>
      <p className="mt-4 max-w-[16ch] text-4xl font-medium tracking-[-0.04em]">
        Freight, coordinated without the noise.
      </p>
      <div className="mt-8 grid gap-4 text-sm text-mute md:grid-cols-3">
        <p>Lane — sample corridor</p>
        <p>Handoff — named desk</p>
        <p>Exception — written path</p>
      </div>
    </Browser>
  );
}

function HarborStudy() {
  return (
    <Browser label="Harbor study · sample records">
      <div className="grid gap-6 md:grid-cols-[10rem_1fr]">
        <p className="label">Clients</p>
        <ul className="divide-y divide-line border-y border-line">
          {["Sample account A", "Sample account B", "Sample account C"].map((name, index) => (
            <li key={name} className="flex items-center justify-between py-3 text-sm">
              <span>{name}</span>
              <span className="text-mute">{index === 1 ? "Review note" : "Next action"}</span>
            </li>
          ))}
        </ul>
      </div>
    </Browser>
  );
}

function FieldnoteStudy() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
      <Phone label="Visit">
        <p className="text-lg font-medium">Site visit — sample</p>
        <ul className="mt-4 space-y-3 text-sm">
          {["Access confirmed", "Photo slot", "Flag an issue"].map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              <span className={`h-4 w-4 border ${index === 0 ? "bg-accent border-accent" : "border-paper/40"}`} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-mute">Saved on device · waiting to sync</p>
      </Phone>
      <Browser label="Review">
        <p className="label">Day summary</p>
        <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">One flagged check. Two still open.</p>
      </Browser>
    </div>
  );
}

function LumenStudy() {
  return (
    <Browser label="Lumen study · Aperture 04">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="min-h-48 bg-[linear-gradient(180deg,transparent,rgba(83,109,255,0.45),transparent)]" />
        <div>
          <p className="label">Study object</p>
          <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">Aperture 04</p>
          <p className="deck mt-4">
            Material, proportion, and a commission inquiry. Illustrative dimensions only. Not a product for sale.
          </p>
        </div>
      </div>
    </Browser>
  );
}

function KineticStudy() {
  return (
    <Browser label="Launch outline">
      <p className="label">Six weeks · sample themes</p>
      <ol className="mt-4 divide-y divide-line border-y border-line">
        {["The offer sentence", "The method", "The objection", "The proof we will not invent", "The page", "The invitation"].map(
          (theme, index) => (
            <li key={theme} className="flex gap-4 py-3 text-sm">
              <span className="label">0{index + 1}</span>
              <span>{theme}</span>
            </li>
          ),
        )}
      </ol>
    </Browser>
  );
}

function LedgerStudy() {
  return (
    <Browser label="Ledger study · sample rows">
      <p className="label">Exception queue</p>
      <ul className="mt-4 divide-y divide-line border-y border-line font-mono text-sm">
        {[
          ["REF-01", "Open"],
          ["REF-02", "Scheduled"],
          ["REF-03", "Exception"],
        ].map(([ref, status]) => (
          <li key={ref} className="flex justify-between py-3">
            <span>{ref}</span>
            <span className={status === "Exception" ? "text-paper" : "text-mute"}>{status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-mute">No amounts are shown. These are not company accounts.</p>
    </Browser>
  );
}

const studies = {
  northline: NorthlineStudy,
  harbor: HarborStudy,
  fieldnote: FieldnoteStudy,
  lumen: LumenStudy,
  kinetic: KineticStudy,
  ledger: LedgerStudy,
};

export function InterfaceStudy({ slug }: { slug: string }) {
  const Study = studies[slug as keyof typeof studies] ?? NorthlineStudy;
  return (
    <figure>
      <Study />
      <figcaption className="label mt-4">
        Interface study. Designed for this case. Not a screenshot of a shipped product.
      </figcaption>
    </figure>
  );
}
