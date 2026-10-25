import type { processSteps } from "@/data/process";

type Step = (typeof processSteps)[number];

export function StageRecord({ step, live = false }: { step: Step; live?: boolean }) {
  return (
    <div className="stage-record" aria-live={live ? "polite" : undefined}>
      <div className="stage-record-bar">
        <span>Stage {step.index} of 06</span>
        <span>{step.title}</span>
      </div>
      <div className="stage-record-body">
        <p className="label">Recorded in this stage</p>
        <ol className="mt-6">
          {step.points.map((point, index) => (
            <li key={point} className="stage-record-row">
              <span className={index === 0 ? "stage-mark is-on" : "stage-mark"} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ol>
        <RecordSketch index={step.index} />
      </div>
    </div>
  );
}

function RecordSketch({ index }: { index: Step["index"] }) {
  if (index === "01") {
    return (
      <div className="stage-sketch" aria-hidden="true">
        <span>Brief</span>
        <i />
        <i className="short" />
        <i />
      </div>
    );
  }
  if (index === "02") {
    return (
      <div className="stage-sketch split" aria-hidden="true">
        <div>
          <span>In</span>
          <i />
          <i className="short" />
        </div>
        <div>
          <span>Later</span>
          <i />
          <i className="short" />
        </div>
      </div>
    );
  }
  if (index === "03") {
    return (
      <div className="stage-sketch frame" aria-hidden="true">
        <b />
        <i />
        <i className="short" />
        <em />
      </div>
    );
  }
  if (index === "04") {
    return (
      <div className="stage-sketch files" aria-hidden="true">
        <span>scope.ts</span>
        <span className="is-on">interface.tsx</span>
        <span>release.md</span>
      </div>
    );
  }
  if (index === "05") {
    return (
      <div className="stage-sketch checks" aria-hidden="true">
        <span>Paths checked</span>
        <span>Checklist signed</span>
        <span className="is-on">Handed over</span>
      </div>
    );
  }
  return (
    <div className="stage-sketch" aria-hidden="true">
      <span>Separate agreement</span>
      <i className="short" />
    </div>
  );
}
