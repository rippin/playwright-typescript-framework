import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { expect, test as setup } from '@playwright/test';

import { environment } from '../../src/config/environment.js';
import { LoginPage } from '../../src/pages/login.page.js';

const authenticationState = resolve('playwright/.auth/saucedemo.json');

setup('authenticate the standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(environment.SAUCE_USERNAME, environment.SAUCE_PASSWORD);

  await expect(page).toHaveURL(/\/inventory\.html$/);

  await mkdir(dirname(authenticationState), { recursive: true });
  await page.context().storageState({ path: authenticationState });
});
