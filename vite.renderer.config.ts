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
        },
        test: {
            expect: { requireAssertions: true },
            projects: [
                {
                    extends: './vite.renderer.config.ts',
                    test: {
                        name: 'client',
                        environment: 'browser',
                        browser: {
                            enabled: true,
                            provider: 'playwright',
                            instances: [{ browser: 'chromium' }]
                        },
                        include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                        exclude: ['src/lib/server/**'],
                        setupFiles: ['./vitest-setup-client.ts']
                    }
                }
            ]
        }
    };
});