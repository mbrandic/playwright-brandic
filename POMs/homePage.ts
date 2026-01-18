import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly firstProduct: Locator;
  readonly navCategoryAlat: Locator;

  constructor(page: Page) {
    this.page = page;
    // Prvi proizvod po točnom selektoru
    this.firstProduct = page.locator('#post-848 div.roadthemes-products div.owl-stage-outer div.owl-stage div.owl-item').first();

    // Navigacijski link "Alati" po točnom selektoru
    this.navCategoryAlat = page.locator('#main_ul-primary > li.menu-item-242981 > a > span > span');
  }

  // Otvara homepage
  async open() {
    await this.page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
  }

  // Provjera da naslov stranice nije prazan
  async verifyPageTitle() {
    const title = await this.page.title();
    expect(title.length).toBeGreaterThan(0);
  }

  // Klik na prvi proizvod
  async openFirstProduct() {
    await this.firstProduct.waitFor({ state: 'visible', timeout: 30000 });
    await this.firstProduct.click();
    await expect(this.page).toHaveURL(/\/proizvod\//);
  }

  // Klik na kategoriju "Alati"
  async openAlatCategory() {
    await this.navCategoryAlat.waitFor({ state: 'visible', timeout: 30000 });
    await this.navCategoryAlat.click();
    await expect(this.page).toHaveURL(/\/kategorija\/alati/);
  }
}
