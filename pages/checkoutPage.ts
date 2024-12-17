import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly addToCardBtn: Locator;
    readonly numberOfItems: Locator;
    readonly numberOfProductsCheckout: Locator;
    readonly numberOfProductsCheck;
    readonly proceedToCheckoutBtn: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    readonly proceedToCheckoutBtn2: Locator;
    readonly proceedToCheckoutBtn3: Locator;
    readonly paymentInput: string;
    readonly creditCardInput: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderNameInput: Locator;
    readonly confirmBtn: Locator;
    readonly checkoutSuccessMessage: Locator;
    readonly errorWindows: Locator;
    readonly errorMessages: Locator;
    
    
  constructor(page: Page) {
      this.page = page;
     
      this.numberOfItems = page.locator('#lblCartCount');
      this.numberOfProductsCheckout = page.locator('tbody > tr');
      this.numberOfProductsCheck = 'tbody > tr';
      this.proceedToCheckoutBtn = page.locator('button[data-test=proceed-1]');
      this.emailInput = page.locator('#email');
      this.passwordInput = page.locator('#password');
      this.submitBtn = page.locator('.btnSubmit');
      this.proceedToCheckoutBtn2 = page.locator('button[data-test=proceed-2]');
      this.proceedToCheckoutBtn3 = page.locator('button[data-test=proceed-3]');
      this.paymentInput = '#payment-method';
      this.creditCardInput = page.locator('input[data-test=credit_card_number]');
      this.expirationDateInput = page.locator('input[data-test=expiration_date]');
      this.cvvInput = page.locator('input[data-test=cvv]');
      this.cardHolderNameInput = page.locator('input[data-test=card_holder_name]');
      this.confirmBtn = page.locator('button[data-test=finish]');
      this.checkoutSuccessMessage = page.locator('div.help-block');
      this.errorWindows = page.locator('div.alert-danger');
      this.errorMessages = page.locator('div.alert-danger > div');
      
      }

    async checkNumberOfItems() {
      let nbrBasketText = await this.numberOfItems.textContent();
      let numberBasket = Number(nbrBasketText);
      console.log(nbrBasketText);
      let numberItemsInCheckout = await this.page.waitForSelector(this.numberOfProductsCheck);
      await expect(this.numberOfProductsCheckout).toHaveCount(numberBasket);
      
  }
    async proceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }

    async loginIntoAccount(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
        await this.proceedToCheckoutBtn2.isVisible();
        await this.proceedToCheckoutBtn2.click();
        await this.proceedToCheckoutBtn3.click();
    }

    async enterPaymentData(paymentMethod: string, creditCardNumber: string, expirationDate: string, cvv: string, cardHolderName: string) {
      
      await this.page.selectOption(this.paymentInput, paymentMethod);
      await this.creditCardInput.click();
      await this.creditCardInput.fill(creditCardNumber);
      await this.expirationDateInput.click();
      await this.expirationDateInput.fill(expirationDate);
      await this.cvvInput.click();
      await this.cvvInput.fill(cvv);
      await this.cardHolderNameInput.click();
      await this.cardHolderNameInput.fill(cardHolderName);
      //await this.confirmBtn.click();
    }

    async checkErrorMessagesNumber() {
      let errorMessagesNumber = await this.errorMessages.count();
      await expect(this.errorWindows).toHaveCount(errorMessagesNumber);

    }

    
}
