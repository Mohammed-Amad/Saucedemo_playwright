import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Add to Cart Feature', () => {
  let page: Page;
  let inventory: InventoryPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const login = new LoginPage(page);

    await login.goto();
    await page.waitForTimeout(1000); 

    await login.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.waitForTimeout(1000); 

    inventory = new InventoryPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('add backpack to cart', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await page.waitForTimeout(1000); 

    await inventory.goToCart();
    await page.waitForTimeout(1000);

    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toContainText('Backpack');
    await page.waitForTimeout(1000);
  });
});
