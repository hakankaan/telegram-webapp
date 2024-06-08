import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web-app',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [process.cwd()]
    }
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [svelte(), nxViteTsPaths()],


  build: {
    outDir: '../../dist/apps/web-app',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
