import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess({ script: true }),

  kit: {
    adapter: adapter({
      pages: '.vite/build/renderer/main_window',
      fallback: 'src/app.html',
    }),
    alias: {
      '$components': 'src/lib/components',
    },
  },
};

export default config;