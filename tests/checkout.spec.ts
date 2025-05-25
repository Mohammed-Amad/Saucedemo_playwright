import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  const cases = [
    { name: 'valid first, last, zip', first: 'John', last: 'Doe', zip: '12345', shouldSucceed: true },
    { name: 'empty first, empty last, empty zip', first: '', last: '', zip: '', shouldSucceed: false },
    { name: 'empty first, valid last, valid zip', first: '', last: 'Doe', zip: '12345', shouldSucceed: false },
    { name: 'valid first, empty last, valid zip', first: 'John', last: '', zip: '12345', shouldSucceed: false },
    { name: 'valid first, valid last, empty zip', first: 'John', last: 'Doe', zip: '', shouldSucceed: false },
  ];

  for (const tc of cases) {
    test(tc.name, async ({ browser }) => {
      const page = await browser.newPage();

      const login = new LoginPage(page);
      await login.goto();

      await login.login(process.env.USER_NAME!, process.env.PASSWORD!);

      const inventory = new InventoryPage(page);
      await inventory.addToCart('sauce-labs-backpack');

      await inventory.goToCart();

      const cart = new CartPage(page);
      await cart.checkout();

      const checkout = new CheckoutPage(page);
      await checkout.fillInfo(tc.first, tc.last, tc.zip);

      if (tc.shouldSucceed) {
        await checkout.finishCheckout();
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
      } else {
        await expect(checkout.getError()).toBeVisible();
      }

      await page.close();
    });
  }
});
