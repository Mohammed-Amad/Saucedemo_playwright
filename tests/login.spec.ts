import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  const loginCases = [
    { name: 'correct user and correct password', user: process.env.USER_NAME!, pass: process.env.PASSWORD!, shouldSucceed: true },
    { name: 'incorrect user and incorrect password', user: 'wrong_user', pass: 'wrong_pass', shouldSucceed: false },
    { name: 'empty user and empty password', user: '', pass: '', shouldSucceed: false },
    { name: 'valid user and empty password', user: process.env.USER_NAME!, pass: '', shouldSucceed: false },
    { name: 'empty user and valid password', user: '', pass: process.env.PASSWORD!, shouldSucceed: false },
  ];

  for (const tc of loginCases) {
    test(tc.name, async ({ page }) => {
      const login = new LoginPage(page);

      await login.goto();
      await page.waitForTimeout(1000); 

      await login.login(tc.user, tc.pass);
      await page.waitForTimeout(1000); 

      if (tc.shouldSucceed) {
        await expect(page).toHaveURL(/inventory/);
        await page.waitForTimeout(1000); 
      } else {
        await expect(login.getError()).toBeVisible();
        await page.waitForTimeout(1000); 
      }
    });
  }
});
