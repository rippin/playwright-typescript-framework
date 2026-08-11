import { expect, test } from '@playwright/test';

import { CartPage } from '../../../src/pages/cart.page.js';
import { CHECKOUT_PRODUCT, reachCart } from '../../../src/support/saucedemo/checkout.flow.js';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await reachCart(page);
  });

  test('shopper can review an added product', { tag: '@regression' }, async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.productName(CHECKOUT_PRODUCT)).toBeVisible();
    await expect(cartPage.productPrice(CHECKOUT_PRODUCT)).toHaveText('$29.99');
  });

  test('shopper can remove a product', { tag: '@regression' }, async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.removeProduct(CHECKOUT_PRODUCT);

    await expect(cartPage.productName(CHECKOUT_PRODUCT)).toHaveCount(0);
    await expect(cartPage.shoppingCartBadge).toHaveCount(0);
  });
});
