import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly inventoryList: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  productName(name: string): Locator {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: name });
  }
}
