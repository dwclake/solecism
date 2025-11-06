import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    build: {
        sourcemap: true,
        outDir: '.vite/build/main',
        emptyOutDir: false,
        minify: 'esbuild',
        target: 'esnext',

        rollupOptions: {
            input: path.resolve(__dirname, 'main/index.ts'),
            external: ['electron'],
            output: {
                entryFileNames: 'index.cjs',
                format: 'cjs',
            },
        }
    }
});
