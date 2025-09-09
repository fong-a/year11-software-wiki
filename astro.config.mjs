// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://fong-a.github.io/year11-software-wiki',
  // base: '/year11-software-wiki', // Removing base path to fix routing issues
  integrations: [mdx(), sitemap(), react(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: ['python', 'javascript', 'text'],
      wrap: true
    }
  }
});
