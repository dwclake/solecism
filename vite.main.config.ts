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
    }
});
