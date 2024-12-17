import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly itemLocator: Locator;
    
  constructor(page: Page) {
      this.page = page;
      this.itemLocator = page.locator('.card-img-top');
    }

    async selectFirstItem() {
      await this.page.goto('/');
      await this.itemLocator.first().click();
    }
    
    async selectLastItem() {
        await this.page.goBack();
        await this.itemLocator.last().click();
      }
}