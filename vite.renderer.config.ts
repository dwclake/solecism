import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async () => {
    const { sveltekit } = await import('@sveltejs/kit/vite');
    return {
        plugins: [tailwindcss(), sveltekit()],
        optimizeDeps: {
            exclude: ['@sveltejs/kit'],
        },
        ssr: {
            noExternal: ['@sveltejs/kit'],
        }
    };
});
