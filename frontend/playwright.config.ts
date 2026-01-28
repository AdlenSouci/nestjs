import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // C'est cette ligne qui compte : On lui dit de regarder dans le dossier "tests"
  testDir: './tests',
  
  // On lui dit de chercher tous les fichiers qui finissent par .ts
  testMatch: '**/*.spec.ts',

  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173', // L'adresse de ton site
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});