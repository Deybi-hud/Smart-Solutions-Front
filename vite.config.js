import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    watch: {
      // Bind mounts desde Windows hacia Docker Desktop no propagan eventos
      // inotify de forma confiable: sin polling, Vite no detecta cambios de archivo.
      usePolling: true,
      interval: 300,
    },
  },
})
