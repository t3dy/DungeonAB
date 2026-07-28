import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const page = p => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  root: 'src',
  // Served from https://t3dy.github.io/DungeonAB/ on GitHub Pages, so
  // assets must resolve under the repo subpath. Local dev and Vercel
  // (served at root) keep '/'.
  base: process.env.GITHUB_PAGES ? '/DungeonAB/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: page('./src/index.html'),
        // MORIGNY sub-project (morigny/CLAUDE.md) — served at /morigny/
        morigny: page('./src/morigny/index.html'),
      },
    },
  },
  server: {
    port: 5175,
  },
})
