import { test } from '@playwright/test';
import { CartPage } from '../POMs/cart';

test.describe('Košarica – dodavanje i brisanje proizvoda', () => {

  test('Dodavanje proizvoda u košaricu', async ({ page }) => {
    const cartPage = new CartPage(page);

    // Otvaranje proizvoda i dodavanje u košaricu
    await cartPage.openProductPage();
    await cartPage.addProductToCart();

    // Otvaranje košarice i provjera
    await cartPage.openCartPage();
    await cartPage.verifyProductIsInCart();
  });

  test('Brisanje proizvoda iz košarice', async ({ page }) => {
    const cartPage = new CartPage(page);

    // Prvo dodajemo proizvod da bismo ga mogli obrisati
    await cartPage.openProductPage();
    await cartPage.addProductToCart();

    // Otvaramo košaricu i provjeravamo proizvod
    await cartPage.openCartPage();
    await cartPage.verifyProductIsInCart();

    // Brišemo proizvod i provjeravamo praznu košaricu
    await cartPage.removeProductFromCart();
    await cartPage.verifyCartIsEmpty();
  });

});
