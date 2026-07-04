import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  // Served from https://t3dy.github.io/DungeonAB/ on GitHub Pages, so
  // assets must resolve under the repo subpath. Local dev and Vercel
  // (served at root) keep '/'.
  base: process.env.GITHUB_PAGES ? '/DungeonAB/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5175,
  },
})
