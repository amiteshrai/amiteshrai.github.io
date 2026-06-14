---
description: Scaffold a new explanatory blog post (frontmatter + structure)
argument-hint: [post title]
---

Scaffold a new MDX blog post for the title: **$ARGUMENTS**

Follow `docs/guides/AUTHORING.md` exactly. Steps:

1. Derive a kebab-case slug from the title. The file path is `src/content/posts/<slug>.mdx`.
   If a file with that slug already exists, stop and tell the user.
2. Ask the user for anything not obvious from the title:
   - **category** (exactly one of: `Data Platforms` | `MLOps & Forecasting` | `Agentic AI`)
   - 2-4 **tags**
   - a one-line **summary**
3. Create the file with this frontmatter (use today's date, `draft: true`):
   ```
   ---
   title: "<title>"
   date: <YYYY-MM-DD>
   category: "<category>"
   draft: true
   tags: [<tags>]
   summary: "<summary>"
   ---
   ```
4. Below the frontmatter, add the explanatory skeleton as comments/placeholders the author fills in:
   - **Hook** (1-2 sentences: the real-world tension)
   - **The mental model** (prose; add a ` ```mermaid ` diagram if it helps)
   - **A worked example** (concrete - real numbers or a small scenario)
   - One or more `<Insight>` callouts for the key idea(s) - import it at the top
   - **An interactive demo** placeholder (Chart / Stepper / PyodideCell) with the right `client:*` directive
   - **Recap / try it**
5. Honor the voice and rules from `docs/guides/AUTHORING.md`: technical architect + consultant, human with
   humor, explanatory with examples; minimal hyphens; standard ASCII only; NO client/employer names
   (use type/sector descriptors); never use lines-of-code as a metric.
6. Leave `draft: true`. Do not publish. Remind the user to preview with `npm run dev` and flip the
   draft flag when ready.
