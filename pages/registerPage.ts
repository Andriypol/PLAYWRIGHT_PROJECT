import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly dateOfBirth: Locator;
    readonly addressInput: Locator;
    readonly postcodeInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly countryInput;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    
  // text errors  
    readonly existedEmailError: Locator;
    readonly psdError: Locator;
    readonly psdErrorText: Locator;
    readonly successPageTitle: Locator;

    readonly firstnameError: Locator;
    readonly lastnameError: Locator;
    readonly dobError: Locator;
    readonly addressError: Locator;
    readonly postcodeError: Locator;
    readonly cityError: Locator;
    readonly stateError: Locator;
    readonly countryError: Locator;
    readonly phoneError: Locator;
    readonly emailError: Locator;
    
  
    
    constructor(page: Page) {
      this.page = page;

      this.firstnameInput = page.locator('input#first_name');
      this.lastnameInput = page.locator('input#last_name');
      this.dateOfBirth = page.locator('#dob');
      this.addressInput = page.locator('input#address');
      this.postcodeInput = page.locator('input#postcode');
      this.cityInput = page.locator('input#city');
      this.stateInput = page.locator('input#state');
      this.countryInput = '#country';
      this.phoneInput = page.locator('input#phone');
      this.emailInput = page.locator('input#email');
      this.passwordInput = page.locator('input#password');
      this.submitBtn = page.locator('.btnSubmit');
      this.existedEmailError = page.locator('.help-block')
      this.successPageTitle = page.locator('h1[data-test="page-title"]');
      
      
      this.firstnameError = page.locator('div[data-test="first-name-error"]');
      this.lastnameError = page.locator('div[data-test="last-name-error"]');
      this.dobError = page.locator('div[data-test="dob-error"]');
      this.addressError = page.locator('div[data-test="address-error"]');
      this.postcodeError = page.locator('div[data-test="postcode-error"]');
      this.cityError = page.locator('div[data-test="city-error"]');
      this.stateError = page.locator('div[data-test="state-error"]');
      this.countryError = page.locator('div[data-test="country-error"]');
      this.phoneError = page.locator('div[data-test="phone-error"]');
      this.emailError = page.locator('div[data-test="email-error"]');
      this.psdError = page.locator('input[aria-describedby="password-error"]');
      this.psdErrorText = page.locator('div[data-test="password-error"] > div');

    }

    async fillRegisterForm(firstname: string, lastname: string, dateofbirth: string, address: string, postcode: string, city: string, state: string, country: string, phone: string, email: string, password: string) {
      await this.firstnameInput.click();
      await this.firstnameInput.fill(firstname);
      await this.lastnameInput.click();
      await this.lastnameInput.fill(lastname);
      
      await this.dateOfBirth.fill(dateofbirth);
      
      await this.addressInput.click();
      await this.addressInput.fill(address);
      await this.postcodeInput.click();
      await this.postcodeInput.fill(postcode);
      await this.cityInput.click();
      await this.cityInput.fill(city);
      await this.stateInput.click();
      await this.stateInput.fill(state);
    
      await this.page.selectOption(this.countryInput, country);

      await this.phoneInput.click();
      await this.phoneInput.fill(phone);
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      
      await this.submitBtn.click();
    }

    async something(username: string, password: string) {
      
    }
}