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
| Diagram | ` ```mermaid ` block | showing the model (build-time SVG, ~0 JS) | none |
| Chart | `interactive/Chart.tsx` | making data tangible | `client:visible` |
| Stepper | `interactive/Stepper.tsx` | walking one idea at a time | `client:visible` |
| Runnable | `interactive/PyodideCell.tsx` | letting them run it | `client:idle` |

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
