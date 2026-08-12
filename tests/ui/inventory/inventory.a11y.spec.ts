import { expect, test } from '../../../src/fixtures/ui.fixture.js';
import { InventoryPage } from '../../../src/pages/inventory.page.js';

test('open menu exposes the expected navigation semantics', { tag: '@a11y' }, async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.goto();
  await inventoryPage.openMenu();

  await expect(inventoryPage.menuCloseButton).toBeVisible();
  await expect(inventoryPage.navigationMenu).toMatchAriaSnapshot(`
    - navigation:
      - link "All Items" [active]
      - link "About"
      - link "Logout"
      - link "Reset App State"
  `);
});
