import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: process.env.GITHUB_PAGES ? '/Morigny/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5176,
  },
})
