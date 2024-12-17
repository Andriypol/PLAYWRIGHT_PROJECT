import { test, expect } from "@playwright/test";
import { PageFactory } from '../pages/pageFactory';





test.describe("POSITIVE LOGIN TESTS", () => {
  test.beforeEach(async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    loginPage.navigateToLoginPage();
    
  })
  
  test("Login with valid data", async ({ page }) => {

    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    const accountPage = pageFactory.getAccountPage();
    loginPage.login('hriak@i.ua','Boris$19999')
    await accountPage.assertAccountPage();
  });

});


test.describe("NEGATIVE LOGIN TESTS", () => {
  test.beforeEach(async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    loginPage.navigateToLoginPage();
  })

  test("Login with invalid email", async ({ page }) => {

    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    loginPage.login('andrr2tA1@i.ua','Boris$19999')
    await expect(page.locator(loginPage.loginErrorTxt)).toHaveText('Invalid email or password');
    
  });
  
  test("Login with password without uppercase and special symbol", async ({ page }) => {
      const pageFactory = new PageFactory(page);
      const loginPage = pageFactory.getLoginPage(); 
      loginPage.login('andrte12@i.ua','boris19999')
      
      await expect(page.locator(loginPage.loginErrorTxt)).toHaveText('Invalid email or password');
    });

  test("Login with empty fields", async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    loginPage.login(' ',' ');
    await expect(page.locator(loginPage.emailErrorTxt)).toBeVisible();
    await expect(page.locator(loginPage.pswdErrorTxt)).toBeVisible();
      
  });
  
  });
