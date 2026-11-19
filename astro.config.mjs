// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow.
// When SINTEL's own domain is live, set SITE_URL to it and BASE_PATH to "/".
const site = process.env.SITE_URL || 'https://saswatartificiality-debug.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
    {
      name: 'stable-client-filenames',
      hooks: {
        'astro:build:setup': ({ vite, target }) => {
          vite.build ??= {};
          vite.build.rollupOptions ??= {};
          const out = { ...(vite.build.rollupOptions.output || {}) };
          // Stylesheets are emitted by the server-side pass, scripts by the client pass.
          out.assetFileNames = '_astro/[name][extname]';
          if (target === 'client') {
            out.entryFileNames = '_astro/[name].js';
            out.chunkFileNames = '_astro/[name].js';
          }
          vite.build.rollupOptions.output = out;
        },
      },
    },
  ],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Unhashed browser file names (client build only): GitHub Pages caches HTML for up to 10 minutes,
  // so a page cached before a deploy must still find its script afterwards. Hashed names were deleted
  // on each deploy, leaving cached pages without JavaScript and the loader frozen at 00.
});
