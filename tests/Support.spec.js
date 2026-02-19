// tests/support.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Support Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/support');
  });

  test('Verify support email is visible and correct', async ({ page }) => {
    const emailLocator = page.getByText('developers@niftyitsolution.com');
    await expect(emailLocator).toBeVisible();
    await expect(emailLocator).toHaveText('developers@niftyitsolution.com');
  });

  test('Verify support hours are displayed correctly', async ({ page }) => {
    const hoursLocator = page.getByText('Monday to Friday: 11AM to 9PM');
    await expect(hoursLocator).toBeVisible();
    await expect(hoursLocator).toHaveText('Monday to Friday: 11AM to 9PM');
  });

  test('Verify response time info is visible', async ({ page }) => {
    const responseLocator = page.getByText('We typically reply within 40 minutes during support hours.');
    await expect(responseLocator).toBeVisible();
  });

  test('Verify support phone number is visible and correct', async ({ page }) => {
    const phoneLocator = page.getByText('+1 (818) 858-1499');
    await expect(phoneLocator).toBeVisible();
    await expect(phoneLocator).toHaveText('+1 (818) 858-1499');
  });

  test('Verify office address is visible and correct', async ({ page }) => {
  const addressLocator = page.getByText(/Unit 11A, Tropical Noor Tower/i);
  await expect(addressLocator).toBeVisible();

  await expect(page.getByText(/40 Kazi Nazrul Islam Ave/i)).toBeVisible();
  await expect(page.getByText(/Dhaka 1215, Bangladesh/i)).toBeVisible();
});


  test('Verify "View User Guide" link is present and clickable', async ({ page }) => {
    const userGuideLink = page.getByRole('link', { name: 'View User Guide' });
    await expect(userGuideLink).toBeVisible();
    await expect(userGuideLink).toHaveAttribute('href', /user-guide/i);
  });

});
