import { expect, Page } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly accountTitle = 'h1[data-test="page-title"]';
    
    constructor(page: Page) {
      this.page = page;
    }

    async assertAccountPage() {
        await expect(this.page.locator(this.accountTitle)).toBeVisible();
    }
}