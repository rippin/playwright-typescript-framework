import { expect, test } from '../../../src/fixtures/accessibility.fixture.js';
import { CheckoutInformationPage } from '../../../src/pages/checkout-information.page.js';
import { reachCheckout } from '../../../src/support/saucedemo/checkout.flow.js';

test.beforeEach(async ({ page }) => {
  await reachCheckout(page);
});

test(
  'checkout information page has no WCAG A or AA violations',
  { tag: ['@a11y', '@high-risk'] },
  async ({ makeAxeBuilder, page }) => {
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await expect(checkoutInformationPage.title).toHaveText('Checkout: Your Information');

    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  },
);
