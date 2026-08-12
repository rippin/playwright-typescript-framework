import { expect, test } from '../../../src/fixtures/ui.fixture.js';
import { CartPage } from '../../../src/pages/cart.page.js';
import { CheckoutCompletePage } from '../../../src/pages/checkout-complete.page.js';
import { CheckoutInformationPage } from '../../../src/pages/checkout-information.page.js';
import { CheckoutOverviewPage } from '../../../src/pages/checkout-overview.page.js';
import { InventoryPage } from '../../../src/pages/inventory.page.js';
import {
  CHECKOUT_PRODUCT,
  VALID_CHECKOUT_CUSTOMER,
} from '../../../src/support/saucedemo/checkout.flow.js';

test('shopper can complete a purchase', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await inventoryPage.goto();
  await inventoryPage.addProductToCart(CHECKOUT_PRODUCT);
  await inventoryPage.openCart();
  await cartPage.startCheckout();
  await checkoutInformationPage.submitCustomer(VALID_CHECKOUT_CUSTOMER);
  await checkoutOverviewPage.finishPurchase();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
  await expect(checkoutCompletePage.confirmationHeader).toHaveText('Thank you for your order!');
  await expect(checkoutCompletePage.confirmationMessage).toContainText(
    'Your order has been dispatched',
  );
});
