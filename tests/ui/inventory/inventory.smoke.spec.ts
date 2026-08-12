import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../../src/pages/inventory.page.js';

test(
  'authenticated user can view inventory',
  { tag: ['@smoke', '@regression', '@prod-safe'] },
  async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.productName('Sauce Labs Backpack')).toBeVisible();
  },
);
