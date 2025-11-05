import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    build: {
        sourcemap: true,
        outDir: '.vite/build/main',
        emptyOutDir: false,
        minify: 'esbuild',
        target: 'node25',

        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.ts'),
            external: ['electron'],
            output: {
                entryFileNames: 'main.cjs',
                format: 'cjs',
            },
        }
    }
});
