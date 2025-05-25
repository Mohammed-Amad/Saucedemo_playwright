import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async removeItem(itemName: string) {
    await this.page.click(`[data-test="remove-${itemName}"]`);
  }
  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}
