import { expect, test, type Page } from '@playwright/test';

import { CartPage } from '../../pages/cart.page.js';
import {
  CheckoutInformationPage,
  type CheckoutCustomer,
} from '../../pages/checkout-information.page.js';
import { InventoryPage } from '../../pages/inventory.page.js';

export const CHECKOUT_PRODUCT = 'Sauce Labs Backpack';

export const VALID_CHECKOUT_CUSTOMER: Readonly<CheckoutCustomer> = Object.freeze({
  firstName: 'Portfolio',
  lastName: 'Shopper',
  postalCode: '90210',
});

export async function addProductToCart(page: Page, productName = CHECKOUT_PRODUCT): Promise<void> {
  await test.step(`Add ${productName} to the cart`, async () => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();
    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });
}

export async function reachCart(page: Page, productName = CHECKOUT_PRODUCT): Promise<void> {
  await addProductToCart(page, productName);

  await test.step('Open the cart', async () => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/\/cart\.html$/);
  });
}

export async function reachCheckout(page: Page, productName = CHECKOUT_PRODUCT): Promise<void> {
  await reachCart(page, productName);

  await test.step('Start checkout', async () => {
    const cartPage = new CartPage(page);

    await cartPage.startCheckout();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
}

export async function reachCheckoutOverview(
  page: Page,
  customer: CheckoutCustomer = VALID_CHECKOUT_CUSTOMER,
  productName = CHECKOUT_PRODUCT,
): Promise<void> {
  await reachCheckout(page, productName);

  await test.step('Submit valid checkout information', async () => {
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await checkoutInformationPage.submitCustomer(customer);

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  });
}
