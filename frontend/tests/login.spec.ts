import { test, expect } from '@playwright/test';

test.describe('Suite de Tests Authentification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Cas 1 : Connexion Reussie', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('admin@example.com');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Admin Login')).not.toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Livres' })).toBeVisible();
    await page.screenshot({ path: 'img_test/login_success.png' });
  });

  test('Cas 2 : Echec - Mauvais Mot de Passe', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('admin@example.com');
    await page.getByPlaceholder('Password').fill('mauvaispass');
    
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Login' }).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Erreur lors de la connexion');
    await dialog.accept();

    await expect(page.getByText('Admin Login')).toBeVisible();
    await page.screenshot({ path: 'img_test/login_bad_password.png' });
  });

  test('Cas 3 : Echec - Utilisateur Inconnu', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('fantome@test.com');
    await page.getByPlaceholder('Password').fill('123456');
    
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Login' }).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Erreur lors de la connexion');
    await dialog.accept();

    await expect(page.getByText('Admin Login')).toBeVisible();
    await page.screenshot({ path: 'img_test/login_unknown_user.png' });
  });
});