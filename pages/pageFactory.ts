import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { AccountPage } from './accountPage';
import { RegisterPage } from './registerPage';
import { HomePage } from './homePage';
import { ItemPage } from './itemPage';
import { CheckoutPage } from './checkoutPage'


export class PageFactory {
    private page: Page;
    
    constructor(page: Page) {
      this.page = page;
    }

    getHomePage() {
        return new HomePage(this.page);
    }

    getLoginPage() {
        return new LoginPage(this.page);
    }

    getRegisterPage() {
        return new RegisterPage(this.page);
    }

    getAccountPage() {
        return new AccountPage(this.page);
    }

    getItemPage() {
        return new ItemPage(this.page);
    }

    getCheckoutPage() {
        return new CheckoutPage(this.page);
    }

}