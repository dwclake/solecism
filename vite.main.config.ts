import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    build: {
        sourcemap: true,
        outDir: '.vite/build/main',
        emptyOutDir: false,
        minify: false,
        target: 'node19',

        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.ts'),
            external: ['electron'],
            output: {
                entryFileNames: 'main.js',
                format: 'cjs',
            },
        },
    },
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.main.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
                }
            }
        ]
    }
});