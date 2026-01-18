import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('button[name="add-to-cart"]');
  }

  // Otvara stranicu proizvoda
  async openProductPage() {
    // Promijenjeno waitUntil na domcontentloaded
    await this.page.goto(process.env.BASE_PRODUCT_URL!, {
      waitUntil: 'domcontentloaded'
    });
  }

  // Dodaje proizvod u košaricu
  async addProductToCart() {
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.addToCartButton).toBeEnabled({ timeout: 15000 });
    await this.addToCartButton.click();

    // Čekanje potvrde da je proizvod dodan (animacija / JS)
    const miniCartItem = this.page.locator('.woocommerce-message, .added_to_cart');
    await miniCartItem.waitFor({ state: 'visible', timeout: 15000 });
  }

  // Otvara stranicu košarice
  async openCartPage() {
    await this.page.goto(`${process.env.BASE_URL}kosarica/`, {
      waitUntil: 'domcontentloaded'
    });

    const cartItem = this.page.locator('.cart_item');
    await expect(cartItem.first()).toBeVisible({ timeout: 20000 });
  }

  // Verificira da li je proizvod u košarici
  async verifyProductIsInCart() {
    const cartItem = this.page.locator('.cart_item');
    await expect(cartItem.first()).toBeVisible({ timeout: 15000 });
  }

  // Briše proizvod iz košarice
  async removeProductFromCart() {
    const removeButton = this.page.locator('.cart_item .remove').first();

    // Čekamo da dugme bude vidljivo prije klika
    await expect(removeButton).toBeVisible({ timeout: 15000 });
    await removeButton.click();

    // Čekamo da se element ukloni iz DOM-a
    await removeButton.waitFor({ state: 'detached', timeout: 20000 });

    // Provjera da se prikazuje poruka da je košarica prazna
    const emptyMessage = this.page.locator('.cart-empty');
    await expect(emptyMessage).toBeVisible({ timeout: 20000 });
  }

  // Provjera da je košarica prazna
  async verifyCartIsEmpty() {
    const emptyMessage = this.page.locator('.cart-empty');
    await expect(emptyMessage).toBeVisible({ timeout: 15000 });
  }
}
