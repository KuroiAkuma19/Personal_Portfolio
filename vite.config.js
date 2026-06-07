import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Use '/' as the base on Vercel (static root). Keep the GitHub Pages base
// for local/gh-pages builds when VERCEL env var is not present.
const isVercel = Boolean(process.env.VERCEL)
const ghPagesBase = '/Personal_Portfolio/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isVercel ? '/' : ghPagesBase,
  build: {
    chunkSizeWarningLimit: 900,
  },
})
