import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: '.vite/build/renderer/webview',
      fallback: 'index.html',
    }),
    alias: {
      '$components': 'src/lib/components',
      '$styles': 'src/lib/styles'
    },
  },
};

export default config;