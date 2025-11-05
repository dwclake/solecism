import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    build: {
        sourcemap: true,
        outDir: '.vite/build/preload',
        emptyOutDir: false,
        minify: false,
        target: 'node19',

        lib: {
            entry: path.resolve(__dirname, 'src/preload.ts'),
            name: 'preload',
            formats: ['cjs'],
            fileName: () => 'preload.js',
        },

        rollupOptions: {
            external: ['electron'],
            output: {
                format: 'cjs',
            },
        },
    },
});