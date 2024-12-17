import { test, expect } from "@playwright/test";
import { PageFactory } from '../pages/pageFactory';
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";

test.describe("POSITIVE REGISTRATION TESTS", () => {
  test.beforeEach(async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    await loginPage.navigateToLoginPage();
    await loginPage.navigateToRegisterPage();
    
  })

  test("Register with valid data", async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    const registerPage = pageFactory.getRegisterPage();
    
    await registerPage.fillRegisterForm('Andr', 'Andr', "1991-01-01", 'Lenon 101 str', '54103', 'Lviv', 'Lviv', 'UA', '349567845', 'ah109riak@i.ua', 'Boris$19999');
    
    await expect(page.locator(loginPage.loginFormTitle)).toBeVisible();
  });


  test("Register with minimum allowed username and password length", async ({ page }) => {

    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    const registerPage = pageFactory.getRegisterPage();
    
    await registerPage.fillRegisterForm('A', 'A', "2001-02-02", 'L', '5', 'A', 'A', 'UA', '3', 'a@i.nu', 'Boris$19');
    
    await expect(page.locator(loginPage.loginFormTitle)).toBeVisible();
  });

  test("Register with a username containing alphanumeric characters", async ({ page }) => {

    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    const registerPage = pageFactory.getRegisterPage();
    await registerPage.fillRegisterForm('A2ndr4', 'A2ndr4', "2004-02-02", 'L', '5', 'A', 'A', 'UA', '3', '89@i.nu', 'Boris$19');
    
    await expect(page.locator(loginPage.loginFormTitle)).toBeVisible();
  });

  test("Register with data that contains both uppercase and lowercase characters", async ({ page }) => {

    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    const registerPage = pageFactory.getRegisterPage();
    await registerPage.fillRegisterForm('AnDr', 'AnDr', "2004-02-02", 'LvIv 101 Str', '554103', 'LvIV', 'LvIV', 'UA', '3349567845', 'tnDRe2@i.ua', 'Boris$19999');
    
    await expect(page.locator(loginPage.loginFormTitle)).toBeVisible();
  });
});

test.describe("NEGATIVE REGISTRATION TESTS", () => {

  test.beforeEach(async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage(); 
    await loginPage.navigateToLoginPage();
    await loginPage.navigateToRegisterPage(); 
  })

  test("Register with existed email", async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const registerPage = pageFactory.getRegisterPage();
    await registerPage.fillRegisterForm('And', 'And', "2002-05-02", 'Lenon 100 str', '5541033', 'Lviv', 'Lviv', 'UA', '3449567845', 'ah01riak@i.ua', 'Boris$19999');
    
    await expect(registerPage.existedEmailError).toHaveText('A customer with this email address already exists.');
  });


  test("Register with invalid password", async ({ page }) => {
      const pageFactory = new PageFactory(page);
      const registerPage = pageFactory.getRegisterPage();
      await registerPage.fillRegisterForm('And', 'And', "2002-05-02", 'Lenon 100 str', '5541033', 'Lviv', 'Lviv', 'UA', '3449567845', 'ah01riak@i.ua', 'boris2222');

      await expect(registerPage.psdError).toBeVisible();
      await expect(registerPage.psdErrorText).toHaveText('Password can not include invalid characters.');
    });
  
  
    test("Register with an empty fields", async ({ page }) => {
      const pageFactory = new PageFactory(page);
      const registerPage = pageFactory.getRegisterPage();
      await registerPage.fillRegisterForm(' ', ' ', ' ', ' ', ' ', ' ', ' ', 'Your country *', ' ', ' ', ' ');

      await expect(registerPage.firstnameError).toBeVisible();
      await expect(registerPage.lastnameError).toBeVisible();
      await expect(registerPage.dobError).toBeVisible();
      await expect(registerPage.addressError).toBeVisible();
      await expect(registerPage.postcodeError).toBeVisible();
      await expect(registerPage.cityError).toBeVisible();
      await expect(registerPage.stateError).toBeVisible();
      await expect(registerPage.countryError).toBeVisible();
      await expect(registerPage.phoneError).toBeVisible();
      await expect(registerPage.emailError).toBeVisible();
      await expect(registerPage.psdError).toBeVisible();
      await expect(registerPage.psdErrorText).toBeVisible();
    
      });

    test("Register with entering into telephone field alphanumeric characters", async ({ page }) => {
        
      const pageFactory = new PageFactory(page);
      const registerPage = pageFactory.getRegisterPage();
      await registerPage.fillRegisterForm('And', 'And', "2002-05-02", 'Lenon 100 str', '541033', 'Lviv', 'Lviv', 'UA', '34A567ab5', 'ah0iak@i.ua', 'Boris$19999');

      await expect(registerPage.phoneError).toHaveText('Only numbers are allowed.');
      });
  
  });