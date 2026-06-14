import { useState } from 'react';

// Tier 3 - a reactive walkthrough. Good base for explaining pipelines or agent flows.
type Step = { title: string; body: string };

const STEPS: Step[] = [
  { title: 'Bronze - Ingest', body: 'Raw events land untouched. Full fidelity, schema-on-read.' },
  { title: 'Silver - Clean', body: 'Dedupe, cast types, enforce contracts. One row = one fact.' },
  { title: 'Gold - Model', body: 'Business entities and conformed dimensions take shape.' },
  { title: 'Mart - Serve', body: 'Metrics exposed to dashboards and downstream consumers.' },
];

export default function Stepper() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  // Boundary behavior: CLAMP - the buttons also disable at the ends.
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(STEPS.length - 1, i + 1));

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Step {index + 1} of {STEPS.length}
      </p>
      <h3 className="mt-1 font-serif text-lg font-semibold text-fg">{step.title}</h3>
      <p className="mt-2 text-muted">{step.body}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="rounded-md border border-border px-3 py-1 text-sm text-fg hover:bg-bg disabled:opacity-40"
        >
          {'<- Prev'}
        </button>
        <button
          onClick={next}
          disabled={index === STEPS.length - 1}
          className="rounded-md border border-border px-3 py-1 text-sm text-fg hover:bg-bg disabled:opacity-40"
        >
          {'Next ->'}
        </button>
      </div>
    </div>
  );
}
