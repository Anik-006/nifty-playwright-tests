import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe('Home Page Test Cases', () => {

  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoHome();
  });

  test('Verify page title', async ({ page }) => {
    await expect(page).toHaveTitle('Nifty Ai');
  });

  test('Verify that the logo is visible', async () => {
    const logo = await homePage.getLogo();
    await expect(logo).toBeVisible();
  });

  const links = [
    { name: 'Privacy Policy', url: /privacy-policy/ },
    { name: 'Terms of Use', url: /terms-of-use/ },
    { name: 'User Guide', url: /user-guide/ },
    { name: 'Support', url: /support/ },
  ];

  links.forEach(link => {
    // Header state for all links
    test(`Header ${link.name} link is visible and navigates correctly`, async () => {
      await homePage.clickLink('header', link.name, link.url);
    });

    // Main state (skip for Support, only in header/footer)
    if (link.name !== 'Support') {
      test(`Main ${link.name} link is visible and navigates correctly`, async () => {
        await homePage.clickLink('main', link.name, link.url);
      });
    }

    // Footer state for all links
    test(`Footer ${link.name} link is visible and navigates correctly`, async () => {
      await homePage.clickLink('footer', link.name, link.url);
    });
  });

});
