import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    host: true,
    hmr: {
      clientPort: 443
    },
    allowedHosts: ['a08d-2a10-d585-692f-1-d9c3-4a4a-8503-2f64.ngrok-free.app'],
  },
})
