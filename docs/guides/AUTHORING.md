# Authoring guide - explanatory posts

How posts get written here. The goal of every post is that a reader *understands* something they
didn't before - not that they're impressed. Teach, don't broadcast.

## Voice

Write like a technical architect and a consultant who is also a human: precise and opinionated,
but warm, with dry humor. Explain concepts with concrete examples and small analogies - show the
idea, don't just name it. Lead with the human "why" before the deep detail.

- Concise. Bold claim, then measured proof. Specificity over adjectives.
- Standard ASCII characters only. Minimal hyphens (open compounds unless a hyphen is required).
- No client or employer names (use type/sector descriptors). Never use lines-of-code as a metric.

## The explanatory structure

Most posts follow this arc. Scale each part to the topic; skip what a given post doesn't need.

1. **Hook** - 1-2 sentences. The real-world tension or question. Why should anyone care?
2. **The mental model** - the core idea in plain language. A `mermaid` diagram here often does
   more than a paragraph.
3. **A worked example** - make it concrete. Real numbers, a small scenario, a before/after.
4. **Insight asides** - use `<Insight>` to surface the one thing to remember. Use `<Aside>` for
   caveats or tangents that shouldn't interrupt the main thread.
5. **An interactive demo, where it earns its place** - a chart, a stepper walkthrough, or a
   runnable Pyodide cell. Pick the lightest tier that makes the idea click (see below).
6. **Recap / try it** - what they now know, and a nudge to go change something and re-run it.

## Interactive tiers as teaching tools

| Tier | Component | Teaches by | Hydration |
|---|---|---|---|
| Diagram | `diagram/` kit (Flow/Step/Group/Compare) | showing the model (HTML/CSS, theme-aware, 0 JS) | none |
| Chart | `interactive/Chart.tsx` | making data tangible | `client:visible` |
| Stepper | `interactive/Stepper.tsx` | walking one idea at a time | `client:visible` |
| Runnable | `interactive/PyodideCell.tsx` | letting them run it | `client:idle` |

## Diagrams (the native kit)

Explanatory workflow diagrams use the native `src/components/diagram/` kit, not Mermaid. The kit is
plain HTML/CSS styled with the site tokens, so diagrams are compact, fully theme-aware (light and
dark), and ship no JS. Import what you need and compose:

```mdx
import Flow from '../../components/diagram/Flow.astro';
import Step from '../../components/diagram/Step.astro';
import Group from '../../components/diagram/Group.astro';
import Compare from '../../components/diagram/Compare.astro';

<Flow>
  <Step icon="lucide:database" badge="1">Profile</Step>
  <Step icon="lucide:sparkles" badge="2">Simplify</Step>
  <Step icon="lucide:git-pull-request" tone="gate">Gate</Step>
  <Step icon="lucide:check" tone="goal">Commit</Step>
</Flow>
```

- **`Flow`** (`direction="row|col"`, optional `title`) draws arrow connectors between its children.
  Use `col` for anything longer than ~4 steps so it never overflows the column width.
- **`Step`** takes `icon` (any `lucide:*`), `badge` (a number), `tone`
  (`default | gate | stop | goal | muted | opaque`), and `branch` / `branchTone` for a single-outcome
  side fork (block, reject) instead of a full graph edge.
- **`Group`** (with `label`) holds parallel items as one unit (one arrow in, one out).
- **`Compare`** lays two `Flow` lanes side by side for an A-vs-B contrast.

Tones carry meaning, kept consistent across posts: `gate` = a checkpoint/decision, `goal` = the
destination (commit, trust), `stop` = a refusal/block, `opaque` = a black box. Mermaid is retained
only for incidental graphs where layout does not matter; if you must use it, see the demo post for
the build-time config.

## Teaching components

```mdx
import Insight from '../../components/Insight.astro';
import Aside from '../../components/Aside.astro';

<Insight>The single most important takeaway goes here.</Insight>
<Insight label="Gotcha">Override the label for "Try it", "Gotcha", "Why it matters", etc.</Insight>
<Aside>A muted side note - context or a caveat.</Aside>
```

## Frontmatter

```yaml
---
title: "Post Title"
date: 2026-06-14
category: "Data Platforms"   # or "MLOps & Forecasting" | "Agentic AI"  (required)
draft: true                   # flip to false to publish
tags: ["topic", "topic"]
summary: "One human sentence."
---
```

## Workflow

Run `/new-post "My Title"` to scaffold a post with this frontmatter and the explanatory skeleton
already in place. Then write, preview with `npm run dev`, and flip `draft: false` when ready.
