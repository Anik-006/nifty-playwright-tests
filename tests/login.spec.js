import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { log } from 'node:console';

test.describe('Login Feature', () => {

  test('Verify User can successfully navigate to the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Nifty Ai');
  });

  test('Verify That User can click Sign In button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(/signin/);
  });

  test('Verify Sign in with Zoom button', async ({ page }) => {
    await page.goto('/');
    const signinZoomButton = page.getByText('Sign in with Zoom');
    await signinZoomButton.click();
    await expect(page).toHaveURL(/signin/);
  });

  test('Verify That user can successfully login with valid credentials', async ({ page }) => {
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
    test(`Verify that user cannot login with invalid credentials - Case ${index + 1}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login(data.username, data.password);
      await loginPage.verifyErrorMessage();
    });
  });

});
