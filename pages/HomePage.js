// pages/HomePage.js
import { expect } from '@playwright/test';

export class HomePage {

  constructor(page) {
    this.page = page;
    this.header = page.getByRole('navigation');
    this.main = page.getByRole('main');
    this.footer = page.getByRole('contentinfo');
  }

  // Generic function to click a link by section and verify URL
  async clickLink(section, linkText, expectedUrl) {
    let locator;
    if (section === 'header') locator = this.header.getByRole('link', { name: linkText });
    if (section === 'main') locator = this.main.getByRole('link', { name: linkText });
    if (section === 'footer') locator = this.footer.getByRole('link', { name: linkText });

    await expect(locator).toBeVisible();
    await locator.click();
    await expect(this.page).toHaveURL(expectedUrl);
  }

  
  async getLogo() {
    return this.page.getByAltText('Nifty Ai');
  }

  async gotoHome() {
    await this.page.goto('/', { waitUntil: 'networkidle', timeout: 60_000 });
  }
}
