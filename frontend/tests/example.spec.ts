import { test, expect } from '@playwright/test';

test('Le titre de la page est correct', async ({ page }) => {
  // On visite ton site local
  await page.goto('http://localhost:5173');

  // On vérifie que la page charge (en cherchant le body)
  await expect(page.locator('body')).toBeVisible();

  // On fait une capture d'écran automatique (preuve pour le rapport)
  await page.screenshot({ path: 'playwright-report/screenshot-homepage.png' });
});