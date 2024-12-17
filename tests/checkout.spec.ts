import { test, expect } from "@playwright/test";
import { PageFactory } from '../pages/pageFactory';


test.describe("POSITIVE CHECKOUT TESTS", () => {
  
  test("Check the number of products in basket is equal to checkout", async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const homePage = pageFactory.getHomePage();
    const itemPage = pageFactory.getItemPage();
    const checkoutPage = pageFactory.getCheckoutPage();  
    
    await homePage.selectFirstItem();
    await itemPage.addToCard();
    await homePage.selectLastItem();
    await itemPage.addToCard();
    await itemPage.goToBasket();
    await checkoutPage.checkNumberOfItems();

  });
  
  test("Full success checkout", async ({ page }) => {
    
    const pageFactory = new PageFactory(page);
    const homePage = pageFactory.getHomePage();
    const itemPage = pageFactory.getItemPage();
    const checkoutPage = pageFactory.getCheckoutPage();  
    
    await homePage.selectFirstItem();
    await itemPage.addToCard();
    await homePage.selectLastItem();
    await itemPage.addToCard();
    await itemPage.goToBasket();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.loginIntoAccount('ah101riak@i.ua','Boris$19999');
    await checkoutPage.enterPaymentData('Credit Card','5465-7687-9812-4590','11/2025', '294', 'Andrii Sami');
    await expect(checkoutPage.checkoutSuccessMessage).toHaveText('Payment was successful');
  });

  test("Checkout with invalid payment data", async ({ page }) => {
    
    const pageFactory = new PageFactory(page);
    const homePage = pageFactory.getHomePage();
    const itemPage = pageFactory.getItemPage();
    const checkoutPage = pageFactory.getCheckoutPage();  
    
    await homePage.selectFirstItem();
    await itemPage.addToCard();
    await homePage.selectLastItem();
    await itemPage.addToCard();
    await itemPage.goToBasket();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.loginIntoAccount('ah109riak@i.ua','Boris$19999');
    await checkoutPage.enterPaymentData('Credit Card','5465768798124590','112025', '29', 'A3444434A');
    await checkoutPage.checkErrorMessagesNumber();
    
  });

});



