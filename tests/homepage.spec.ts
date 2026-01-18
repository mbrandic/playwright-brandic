import { test } from '@playwright/test';
import { HomePage } from '../POMs/homePage';

test.describe('Homepage testovi', () => {

  test('Homepage se učitava i ima naslov', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.verifyPageTitle();
  });

  test('Otvaranje prvog proizvoda s homepagea', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.openFirstProduct();
  });

  test('Otvaranje kategorije Alati iz navigacije', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.openAlatCategory();
  });

});
