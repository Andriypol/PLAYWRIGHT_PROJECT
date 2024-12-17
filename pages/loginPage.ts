import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput = 'input#email';
    readonly passwordInput = 'input#password';
    readonly signinButton = 'a:has-text("Sign in")';
    readonly loginForm = 'form[data-test="login-form"]';
    readonly loginButton = '.btnSubmit';
    readonly registerButton = 'a[data-test="register-link"]';
    
    readonly loginErrorTxt = 'div[data-test="login-error"]';
    readonly emailErrorTxt = 'div[data-test="email-error"]';
    readonly pswdErrorTxt = 'div[data-test="password-error"]';
    readonly loginFormTitle = 'h3:has-text("Login")';
    readonly firstnameLabel = 'label:has-text("First name")'; 
    
  constructor(page: Page) {
      this.page = page;
    }

    async navigateToLoginPage() {
      await this.page.goto('/');
      await this.page.locator(this.signinButton).click();
      await expect(this.page.locator(this.loginForm)).toBeEnabled();
    }

    async login(email: string, password: string) {
      await this.page.fill(this.emailInput, email);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
    
    async navigateToRegisterPage() {
      await this.page.click(this.registerButton);
      await expect(this.page.locator(this.firstnameLabel)).toBeVisible();
    }
}