import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: process.env.GITHUB_PAGES ? '/Morigny/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        witness: 'src/w.html',   // the public witness page
      },
    },
  },
  server: {
    port: 5176,
  },
})
