import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

//added base: "/Personal_Portfolio/"
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Personal_Portfolio/",
  build: {
    chunkSizeWarningLimit: 900,
  },
})
