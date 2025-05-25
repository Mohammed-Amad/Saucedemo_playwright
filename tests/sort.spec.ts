import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('test of sort', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await page.waitForTimeout(2000); 

  await login.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await page.waitForTimeout(1000);

  await expect(page.url()).toContain("inventory.html");
  await page.waitForTimeout(2000); 

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await page.waitForTimeout(1000); 
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.waitForTimeout(1000); 
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.waitForTimeout(1000); 
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
});
