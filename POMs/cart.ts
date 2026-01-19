import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('button[name="add-to-cart"]');
  }

 
  async openProductPage() {
   
    await this.page.goto(process.env.BASE_PRODUCT_URL!, {
      waitUntil: 'domcontentloaded'
    });
  }

  
  async addProductToCart() {
 
    await this.addToCartButton.click();

    
    const miniCartItem = this.page.locator('.woocommerce-message, .added_to_cart');
   
  }

  async openCartPage() {
    await this.page.goto(`${process.env.BASE_URL}kosarica/`, {
      waitUntil: 'domcontentloaded'
    });

    const cartItem = this.page.locator('.cart_item');
   
  }

 
  async verifyProductIsInCart() {
    const cartItem = this.page.locator('.cart_item');
    
  }

 
  async removeProductFromCart() {
    const removeButton = this.page.locator('.cart_item .remove').first();

    
    
    await removeButton.click();

   
    

   
    const emptyMessage = this.page.locator('.cart-empty');
  
  }


  async verifyCartIsEmpty() {
    const emptyMessage = this.page.locator('.cart-empty');
   
  }
}
