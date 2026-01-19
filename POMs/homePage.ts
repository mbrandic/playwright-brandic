import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly firstProduct: Locator;
  readonly navCategoryAlat: Locator;
  readonly productTitle: Locator;
  readonly categoryHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProduct = page.locator('#post-848 div.roadthemes-products div.owl-stage-outer div.owl-stage div.owl-item').first();
    this.navCategoryAlat = page.locator('#main_ul-primary > li.menu-item-242981 > a > span > span');
    this.productTitle = page.locator('h1.product_title'); 
    this.categoryHeader = page.locator('h1.page-title'); 
  }

  async open() {
    await this.page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
  }

  async verifyPageTitle() {
    const title = await this.page.title();
    expect(title.length).toBeGreaterThan(0);
  }

  async openFirstProduct() {
   
    await this.firstProduct.click();
    await expect(this.page).toHaveURL(/\/proizvod\//);
    
  }

  async openAlatCategory() {
   
    await this.navCategoryAlat.click();
    await expect(this.page).toHaveURL(/\/kategorija\/alati/);
    
  }
}
