import { expect, Locator, Page } from '@playwright/test';

export class ItemPage {
    readonly page: Page;
    readonly addToCardBtn: Locator;
    readonly numberOfItems: Locator;
    
  constructor(page: Page) {
      this.page = page;
      this.addToCardBtn = page.locator('#btn-add-to-cart');
      this.numberOfItems = page.locator('#lblCartCount');
    }

    async addToCard() {
      await expect(this.addToCardBtn).toBeEnabled();
      await this.addToCardBtn.click();
  }

    async goToBasket() {
        await this.numberOfItems.click();
    }
}