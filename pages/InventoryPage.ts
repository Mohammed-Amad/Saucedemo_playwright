import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addToCart(itemName: string) {
    await this.page.click(`[data-test="add-to-cart-${itemName}"]`);
  }
  async removeFromCart(itemName: string) {
    await this.page.click(`[data-test="remove-${itemName}"]`);
  }
  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
