import { expect, test } from '@playwright/test';

import { environment } from '../../../src/config/environment.js';
import { LoginPage } from '../../../src/pages/login.page.js';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test('standard user can log in', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(environment.SAUCE_USERNAME, environment.SAUCE_PASSWORD);

    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('locked-out user is rejected', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('locked_out_user', environment.SAUCE_PASSWORD);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await expect(page).toHaveURL(/\/$/);
  });

  test('username is required', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', environment.SAUCE_PASSWORD);

    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('password is required', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(environment.SAUCE_USERNAME, '');

    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('invalid credentials are rejected', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('invalid-user', 'invalid-password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
