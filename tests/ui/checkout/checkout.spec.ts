import { expect, test } from '@playwright/test';

import { CheckoutInformationPage } from '../../../src/pages/checkout-information.page.js';
import { CheckoutOverviewPage } from '../../../src/pages/checkout-overview.page.js';
import {
  CHECKOUT_PRODUCT,
  reachCheckout,
  VALID_CHECKOUT_CUSTOMER,
} from '../../../src/support/saucedemo/checkout.flow.js';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await reachCheckout(page);
  });

  test('first name is required', { tag: '@regression' }, async ({ page }) => {
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await checkoutInformationPage.submitCustomer({
      ...VALID_CHECKOUT_CUSTOMER,
      firstName: '',
    });

    await expect(checkoutInformationPage.errorMessage).toHaveText('Error: First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test(
    'valid customer information opens the order overview',
    { tag: '@regression' },
    async ({ page }) => {
      const checkoutInformationPage = new CheckoutInformationPage(page);
      const checkoutOverviewPage = new CheckoutOverviewPage(page);

      await checkoutInformationPage.submitCustomer(VALID_CHECKOUT_CUSTOMER);

      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
      await expect(checkoutOverviewPage.productName(CHECKOUT_PRODUCT)).toBeVisible();
      await expect(checkoutOverviewPage.subtotal).toHaveText('Item total: $29.99');
      await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');
    },
  );
});
