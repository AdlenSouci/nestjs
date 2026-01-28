import { test, expect } from '@playwright/test';

test.describe('Suite de Tests Authentification', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Cas 1 : Connexion Reussie', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('admin@example.com');
    await page.getByPlaceholder('Password').fill('admin123');
    
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Admin Login')).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Livres' })).toBeVisible();

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'img_test/login_success.png' });
  });

  test('Cas 2 : Echec - Mauvais Mot de Passe', async ({ page }) => {
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByPlaceholder('Email').fill('admin@example.com');
    await page.getByPlaceholder('Password').fill('mauvaispass');
    
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForTimeout(1000);

    expect(dialogMessage).toContain('Login failed');
    await expect(page.getByText('Admin Login')).toBeVisible();

    await page.screenshot({ path: 'img_test/login_bad_password.png' });
  });

  test('Cas 3 : Echec - Utilisateur Inconnu', async ({ page }) => {
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByPlaceholder('Email').fill('fantome@test.com');
    await page.getByPlaceholder('Password').fill('123456');
    
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForTimeout(1000);

    expect(dialogMessage).toContain('Login failed');
    await expect(page.getByText('Admin Login')).toBeVisible();

    await page.screenshot({ path: 'img_test/login_unknown_user.png' });
  });

});