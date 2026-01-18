import { test } from '@playwright/test';
import { CartPage } from '../POMs/cart';

test.describe('Košarica – dodavanje i brisanje proizvoda', () => {

  test('Dodavanje proizvoda u košaricu', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openProductPage();
    await cartPage.addProductToCart();
    await cartPage.openCartPage();
    await cartPage.verifyProductIsInCart();
  });

  test('Brisanje proizvoda iz košarice', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openProductPage();
    await cartPage.addProductToCart();
    await cartPage.openCartPage();
    await cartPage.verifyProductIsInCart();
    await cartPage.removeProductFromCart();
    await cartPage.verifyCartIsEmpty();
  });

});
