import { useState } from 'react';

// Tier 3 — a reactive walkthrough. Good base for explaining pipelines or agent flows.
type Step = { title: string; body: string };

const STEPS: Step[] = [
  { title: 'Bronze — Ingest', body: 'Raw events land untouched. Full fidelity, schema-on-read.' },
  { title: 'Silver — Clean', body: 'Dedupe, cast types, enforce contracts. One row = one fact.' },
  { title: 'Gold — Model', body: 'Business entities and conformed dimensions take shape.' },
  { title: 'Mart — Serve', body: 'Metrics exposed to dashboards and downstream consumers.' },
];

export default function Stepper() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  // ── YOUR CONTRIBUTION ──────────────────────────────────────────────────────
  // Implement prev() and next(). The meaningful decision here is BOUNDARY BEHAVIOR:
  // what should happen at the first step (Prev) and the last step (Next)?
  //   • CLAMP   → stop at the ends:   setIndex((i) => Math.min(STEPS.length - 1, i + 1))
  //   • WRAP    → loop around:        setIndex((i) => (i + 1) % STEPS.length)
  //   • DISABLE → clamp, and the buttons below already grey out via `disabled`
  // Pick the UX you want. Until you fill these in, the buttons render but do nothing.
  const prev = () => {
    // TODO(amitesh): your call
  };
  const next = () => {
    // TODO(amitesh): your call
  };
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <div className="my-6 rounded-lg border border-neutral-200 p-5">
      <p className="text-sm font-medium text-neutral-500">
        Step {index + 1} of {STEPS.length}
      </p>
      <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
      <p className="mt-2 text-neutral-700">{step.body}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="rounded border border-neutral-300 px-3 py-1 text-sm disabled:opacity-40"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          disabled={index === STEPS.length - 1}
          className="rounded border border-neutral-300 px-3 py-1 text-sm disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
