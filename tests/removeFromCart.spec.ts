import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await page.waitForTimeout(1000); 

    await login.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.waitForTimeout(1000); 

    const inventory = new InventoryPage(page);
    await inventory.addToCart('sauce-labs-backpack');
    await page.waitForTimeout(1000); 
  });

  test('remove from cart on home page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.removeFromCart('sauce-labs-backpack');
    await page.waitForTimeout(1000); 

    await inventory.goToCart();
    await page.waitForTimeout(1000); 

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await page.waitForTimeout(1000); 
  });

  test('remove from cart inside cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goToCart();
    await page.waitForTimeout(1000); 

    const cart = new CartPage(page);
    await cart.removeItem('sauce-labs-backpack');
    await page.waitForTimeout(1000); 

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await page.waitForTimeout(1000); 
  });
});
