import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Feature', () => {

  test('Verify page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Nifty Ai');
  });

  test('Click Sign In button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(/signin/);
  });

  test('Valid Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('admin', '0000');

    //await expect(page).toHaveURL(/dashboard/);
  });

  const invalidCredentials = [
    { username: 'admin', password: '1234' },
    { username: 'wrongUser', password: '0000' },
    { username: 'test', password: 'test123' },
    { username: ' ', password: '0000' },
    { username: 'admin', password: ' ' }
  ];

  invalidCredentials.forEach((data, index) => {
    test(`Negative Login Test - Case ${index + 1}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login(data.username, data.password);
      await loginPage.verifyErrorMessage();
    });
  });

});
