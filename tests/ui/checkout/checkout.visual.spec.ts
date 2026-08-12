import { expect, test } from '@playwright/test';

import { CheckoutOverviewPage } from '../../../src/pages/checkout-overview.page.js';
import { reachCheckoutOverview } from '../../../src/support/saucedemo/checkout.flow.js';

test.beforeEach(async ({ page }) => {
  await reachCheckoutOverview(page);
});

test('order summary matches the approved layout', { tag: '@visual' }, async ({ page }) => {
  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
  await expect(checkoutOverviewPage.orderSummary).toBeVisible();

  await expect(checkoutOverviewPage.orderSummary).toHaveScreenshot('checkout-order-summary.png');
});
