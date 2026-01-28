import { defineConfig } from 'vitest/config' // On utilise bien vitest/config
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // Regarde seulement dans src/
    exclude: ['tests/**', 'node_modules/**'], // Ignore le dossier tests (réservé à Playwright)
  },
})