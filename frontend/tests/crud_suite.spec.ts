import { test, expect } from '@playwright/test';

test.describe('Suite CRUD Admin', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByPlaceholder('Email').fill('admin@example.com');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Admin Login')).not.toBeVisible({ timeout: 15000 });
  });

  test('1. CRUD Catégorie - Créer puis Supprimer', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    const id = Date.now();
    const catName = `cat_${id}`;

    await page.getByRole('button', { name: 'Catégories' }).click();
    const catInput = page.getByPlaceholder('Nom de la catégorie');
    await catInput.fill(catName);
    await page.getByRole('button', { name: 'Ajouter' }).click();

    await expect(catInput).toHaveValue('', { timeout: 20000 });
    await expect(page.getByText(catName).first()).toBeVisible({ timeout: 20000 });
    await page.screenshot({ path: 'img_test/crud_1_categorie_creee.png' });

    const catItem = page.getByRole('listitem').filter({ hasText: catName }).first();
    await catItem.getByRole('button', { name: 'Supprimer' }).click();

    await expect(page.getByText(catName)).not.toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'img_test/crud_2_categorie_supprimee.png' });
  });

  test('2. CRUD Auteur - Créer puis Supprimer', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    const id = Date.now();
    const authName = `auth_${id}`;

    await page.getByRole('button', { name: 'Auteurs' }).click();
    const authInput = page.getByPlaceholder('Nom de l\'auteur');
    await authInput.fill(authName);
    await page.getByRole('button', { name: 'Ajouter Auteur' }).click();

    await expect(authInput).toHaveValue('', { timeout: 20000 });
    await expect(page.getByText(authName).first()).toBeVisible({ timeout: 20000 });
    await page.screenshot({ path: 'img_test/crud_3_auteur_cree.png' });

    const authItem = page.getByRole('listitem').filter({ hasText: authName }).first();
    await authItem.getByRole('button', { name: 'Supprimer' }).click();

    await expect(page.getByText(authName)).not.toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'img_test/crud_4_auteur_supprime.png' });
  });

  test('3. CRUD Livre - Créer puis Supprimer', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    const id = Date.now();
    const catName = `c_book_${id}`;
    const authName = `a_book_${id}`;
    const bookTitle = `book_${id}`;

    await page.getByRole('button', { name: 'Catégories' }).click();
    const catInput = page.getByPlaceholder('Nom de la catégorie');
    await catInput.fill(catName);
    await page.getByRole('button', { name: 'Ajouter' }).click();
    await expect(page.getByText(catName)).toBeVisible({ timeout: 20000 });

    await page.getByRole('button', { name: 'Auteurs' }).click();
    const authInput = page.getByPlaceholder('Nom de l\'auteur');
    await authInput.fill(authName);
    await page.getByRole('button', { name: 'Ajouter Auteur' }).click();
    await expect(page.getByText(authName)).toBeVisible({ timeout: 20000 });

    await page.getByRole('button', { name: 'Livres' }).click();
    const bookInput = page.getByPlaceholder('Titre du livre');
    await expect(bookInput).toBeVisible();
    await bookInput.fill(bookTitle);

    const selectAuthor = page.locator('select').first();
    const selectCat = page.locator('select').nth(1);

    await expect(selectAuthor).toContainText(authName, { timeout: 10000 });
    await expect(selectCat).toContainText(catName, { timeout: 10000 });

    await selectAuthor.selectOption({ label: authName });
    await selectCat.selectOption({ label: catName });

    const createResponse = page.waitForResponse(resp =>
      resp.url().includes('/book') &&
      resp.request().method() === 'POST' &&
      resp.status() === 201
    );
    await page.getByRole('button', { name: 'Ajouter Livre' }).click();
    await createResponse;

    const bookItem = page.getByRole('listitem').filter({ hasText: bookTitle });
    await expect(bookItem).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'img_test/crud_5_livre_cree.png' });

    const deleteResponse = page.waitForResponse(resp =>
      resp.url().includes('/book/') &&
      resp.request().method() === 'DELETE' &&
      resp.status() === 200
    );
    await bookItem.getByRole('button', { name: 'Supprimer' }).click();
    await deleteResponse;

    await expect(bookItem).not.toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'img_test/crud_6_livre_supprime.png' });

    await page.getByRole('button', { name: 'Auteurs' }).click();
    const authItem = page.getByRole('listitem').filter({ hasText: authName }).first();
    await authItem.getByRole('button', { name: 'Supprimer' }).click();

    await page.getByRole('button', { name: 'Catégories' }).click();
    const catItem = page.getByRole('listitem').filter({ hasText: catName }).first();
    await catItem.getByRole('button', { name: 'Supprimer' }).click();
  });
});