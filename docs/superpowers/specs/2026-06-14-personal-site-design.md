# Personal Site - Design & Positioning Spec

**Date:** 2026-06-14
**Owner:** Amitesh Kumar
**Site:** amiteshrai.github.io (Astro 6 scaffold already built and build-verified)
**Status:** Design approved in brainstorming; this doc is the build contract.

> Note: this spec and all site copy use standard ASCII characters only (no accented or
> typographic glyphs) per project convention.

---

## Context

The blog scaffold is live locally (Astro 6 + MDX + React islands + Tailwind v4, build-verified).
This spec layers positioning, copy, information architecture, and a two-mode visual theme onto it,
turning a generic blog into a personal site that markets a specific person to a specific audience.

**Why:** the site must make a senior decision-maker (hiring for engineering leadership, or buying a
consulting engagement) trust Amitesh quickly. That needs intentional positioning and design, not a
default theme.

---

## Audience & positioning

**One reader:** a senior decision-maker evaluating Amitesh for engineering-leadership roles or
consulting engagements. (Leadership hires and consulting buyers are one persona: someone who needs a
proven, trustworthy engineering leader. Not optimizing for startup/IC.)

**The wedge (his own words):** builds platforms that "work at scale and hold up under scrutiny" -
trustworthy, auditable, reproducible, not just fast. This is the spine of all copy.

**Player-coach:** 10+ yrs, leads a 10-person data+AI team across 3 enterprise clients, authored a
$3.5M RFP win, writes production code in the same week.

**Three proof pillars:** Data Platforms, MLOps & Forecasting, Agentic AI. (Full detail in
memory/amitesh-positioning.md.)

---

## Voice & copy principles (Halbert-applied)

- Bold claim, measured proof. Confident declarative headline; understated, specific support. No hype.
- Specificity over adjectives. "~4M weekly scrapes into auditable recommendations," not "large-scale data expertise."
- Write to one reader. Conversational but senior.
- Concise. Short sentences. Cut filler.
- Never use lines-of-code as a metric (memory/avoid-loc-metric.md). Use outcomes/scale.
- Standard ASCII characters only (memory/standard-ascii-characters.md).

### Locked hero copy
> **I build data & AI platforms that hold up under scrutiny.**
> Engineering leader, 10+ years. I architect the platform, lead the team, and write the code.
> Currently leading a 10-person data & AI team at eClerx - open to leadership roles and select
> consulting engagements.

CTAs: **Selected work** (anchors to pillars) and **Get in touch** (email/links).

---

## Confidentiality rule (memory/anonymize-clients-employers.md)

**Scope: blog posts only.** Blog posts must NOT name specific clients or employers - use type/sector
descriptors (e.g. "a large North American industrial distributor"). Keep the impressive
non-identifying metrics. The **landing page and About page MAY name** clients and the current
employer (HD Supply, Adidas, eClerx) - stronger credibility for the target audience.

---

## Information architecture (v1)

| Route | Purpose |
|---|---|
| `/` | Landing. Hero, "What I build - one proof each" pillar strip, featured writing, contact CTA. Names allowed. |
| `/writing` | Blog index (current post list moves here). Grouped/filterable by category. |
| `/posts/[...slug]` | Individual post (existing route, re-themed). Anonymized content. |
| `/tags/[tag]` | Tag pages (existing, re-themed). |
| `/about` | Full bio, career timeline, skills, long-form positioning. Names allowed. |
| Contact | Not a page. Header "Get in touch" CTA + footer block: email, linkedin, github, resume. No backend. |

**Deferred (phase 2):** dedicated `/work` case-study pages; RSS; custom domain.

---

## Blog taxonomy

- **One category per post**, from a fixed set aligned to the pillars:
  `Data Platforms`, `MLOps & Forecasting`, `Agentic AI`. (A 4th, "Engineering Notes", can be added
  later if needed - not in v1.)
- **Free-form tags** for finer-grained topics (multiple per post).
- `/writing` groups posts by category (each category a section), with tag links.
- Schema change: add `category: z.enum([...])` (required) to the posts collection in
  `src/content.config.ts`; keep `tags`.

---

## Visual design system

### Format (from "Refined D1")
Monospace wordmark nav, clean editorial hero (whitespace + a single short accent rule, NO background
grid), "one proof each" 3-pillar strip, writing teaser, footer. Generous whitespace, tight type
scale. "Generic and very specific": neutral timeless frame, concrete defensible content. The
editorial cleanliness (no texture) is the authoritative "writer" element - intentional.

### Type system (shared across both modes)
- Display headlines: Source Serif 4 (700) - editorial authority; serif in BOTH modes.
- Labels / kickers / metadata / wordmark: JetBrains Mono (500) - technical character.
- Body / UI: Inter (400-600).
- Self-hosted via @fontsource packages (no external CDN, no layout shift, works on Pages).

### Color tokens (semantic CSS variables; light = editorial, dark = WARM editorial)
Dark mode is a warm, tuned sibling of the light editorial theme (NOT a cold technical/terminal look).

| Token | Light | Dark (warm editorial) |
|---|---|---|
| `--bg` | `#faf8f3` (warm paper) | `#1c1917` (warm near-black) |
| `--fg` | `#1a1a1a` (ink) | `#f5f1ea` (warm off-white) |
| `--muted` | `#57534e` | `#b0a99e` |
| `--accent` | `#7c2d2d` (oxblood) | `#cf7c6a` (terracotta - dark cousin of oxblood) |
| `--accent-fg` | `#ffffff` | `#1c1917` |
| `--border` | `#e7ddd0` | `#33302b` |
| `--grid` | `#efe6d8` | `#262019` |
| `--card` | `#fffdf8` | `#232019` |

Accent is mode-specific (oxblood reads wrong on dark; terracotta is its dark sibling).

### Theme toggle behavior
- Default: match `prefers-color-scheme` on first visit.
- Manual toggle in the nav (text label "Dark"/"Light" or an SVG icon - NOT emoji); choice persisted to `localStorage`.
- No-flash: a small inline script in `<head>` (before CSS) sets `.dark` on `<html>` from `localStorage` else system.
- Tailwind v4 class-based dark via `@custom-variant dark (&:where(.dark, .dark *));` in `global.css`.

### Interactive tiers under theming
- Mermaid (build-time SVG): renders once with fixed colors; one SVG cannot recolor per mode.
  v1 renders with a neutral theme legible on both backgrounds (verify on dark). Theme-aware diagrams
  are a flagged phase-2 refinement, not a silent gap.
- Recharts island: reads `--fg`/`--accent`/`--grid` (or the `.dark` flag) at runtime and recolors.
- Stepper / PyodideCell: styled with the same tokens; inherit both modes.

---

## How this maps onto the existing scaffold

| Change | Files |
|---|---|
| Home becomes a landing page | rewrite `src/pages/index.astro` (hero + pillars + featured writing) |
| Post list moves to `/writing` | new `src/pages/writing.astro` (current index logic + draft filter + category grouping) |
| New About page | new `src/pages/about.astro` |
| Add category to schema | `src/content.config.ts` (add `category` enum) |
| Theme tokens + dark variant + fonts | rewrite `src/styles/global.css`; add `@fontsource` deps |
| No-flash theme script + toggle | `src/layouts/BaseLayout.astro`; new `src/components/ThemeToggle.astro` |
| Re-theme existing components | `Header.astro`, `Footer.astro`, `PostCard.astro`, `PostLayout.astro` |
| New homepage components | `Hero.astro`, `PillarStrip.astro`, `WritingTeaser.astro`, `ContactBlock.astro` |
| Recharts theme-awareness | `src/components/interactive/Chart.tsx` |
| Mermaid neutral theme | `astro.config.mjs` (rehype-mermaid `mermaidConfig.theme`) |

Existing routing, content collection, and CI stay. Islands stay code-split and lazy.

---

## Acceptance criteria

- [ ] `/`, `/writing`, `/about`, a post, and a tag page render in both light and dark, no flash on load.
- [ ] First visit honors OS theme; manual toggle persists across reloads.
- [ ] Hero matches locked copy exactly; pillars each show one concrete proof.
- [ ] Serif headline in both modes; mono labels; Inter body - fonts self-hosted, no CDN call.
- [ ] Dark mode is the warm editorial palette (terracotta), not a cold technical look.
- [ ] Mermaid diagram legible in both modes; Recharts chart recolors with theme.
- [ ] Posts use generic client/employer descriptors; landing/About may name them.
- [ ] Each post has one category (enum) + tags; `/writing` groups by category.
- [ ] No "LOC" metric and no non-ASCII characters anywhere in copy.
- [ ] `npm run build` clean; all prior interactive-tier acceptance criteria still pass.
- [ ] Body text contrast >= WCAG AA in both modes.

---

## Out of scope (v1)
SSR, comments, search, custom domain, i18n, `/work` case studies, RSS. (RSS + case studies are the
most likely phase-2 adds.)
