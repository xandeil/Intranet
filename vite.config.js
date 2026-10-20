import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    // Em desenvolvimento, encaminha o login SSO e a API para o BFF (server/)
    proxy: {
      '/api/': { target: 'http://localhost:3001', xfwd: true },
      '/auth/': { target: 'http://localhost:3001', xfwd: true },
    },
  },
})