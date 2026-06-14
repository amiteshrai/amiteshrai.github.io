// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://amiteshrai.github.io',
  output: 'static',
  integrations: [react(), mdx(), icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    // Shiki must SKIP mermaid, or it highlights the block before rehype-mermaid
    // can convert it. excludeLangs leaves ```mermaid as plain <code> for the plugin.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    // Build-time Mermaid → inline SVG (0 client JS). Requires Chromium (Playwright).
    rehypePlugins: [[rehypeMermaid, { strategy: 'inline-svg', mermaidConfig: { theme: 'neutral' } }]],
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});