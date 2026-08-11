import { expect, test } from '../../../src/fixtures/accessibility.fixture.js';
import { LoginPage } from '../../../src/pages/login.page.js';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test(
  'login page has no WCAG A or AA violations',
  { tag: ['@a11y', '@high-risk'] },
  async ({ makeAxeBuilder, page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  },
);
