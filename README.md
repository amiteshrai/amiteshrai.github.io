# amiteshrai.github.io

Static-first blog built with **Astro 6 + MDX + React islands + Tailwind v4**, deployed to
GitHub Pages via GitHub Actions. Any post can embed interactive content — diagrams, charts,
reactive components, and runnable code — each hydrated as an independent island.

## Develop

```bash
npm install
npx playwright install chromium   # one-time: needed for build-time Mermaid rendering
npm run dev                       # http://localhost:4321
npm run build                     # static output → dist/
npm run preview                   # serve the built dist/
```

## Authoring

1. Create `src/content/posts/<slug>.mdx` with front matter (`draft: true` while you work):

   ```yaml
   ---
   title: "My Post"
   date: 2026-06-14
   draft: true
   tags: ["topic"]
   summary: "One-line summary."
   ---
   ```

2. Embed interactivity by importing an island and placing it with a `client:*` directive:

   | Situation | Directive |
   |---|---|
   | Diagram only (Mermaid) | none — rendered to inline SVG at build time |
   | Below the fold | `client:visible` |
   | Heavy / needs idle main thread (Pyodide) | `client:idle` |
   | Must be live on first paint (rare) | `client:load` |

3. Publish: flip `draft` → `false`, commit, push to `main`. CI builds and deploys.

## Interactivity tiers

| Tier | Component | Hydration | Runtime JS |
|---|---|---|---|
| 1 — Diagram | ` ```mermaid ` fenced block | none (build-time SVG) | ~0 |
| 2 — Chart | `interactive/Chart.tsx` | `client:visible` | island only |
| 3 — Reactive | `interactive/Stepper.tsx` | `client:visible` | island only |
| 4 — Runnable | `interactive/PyodideCell.tsx` | `client:idle` | Pyodide from CDN |

Islands live in `src/components/interactive/` as standalone, prop-driven artifacts. Swapping
a widget never touches post prose.

## Deploy

Push to `main` → GitHub Actions builds and deploys. One-time setup:
**Settings → Pages → Build and deployment → Source → "GitHub Actions".**

Live at https://amiteshrai.github.io/
