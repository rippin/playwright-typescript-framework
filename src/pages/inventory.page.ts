import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  productName(name: string): Locator {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: name });
  }

  productCard(name: string): Locator {
    return this.inventoryList.getByTestId('inventory-item').filter({ has: this.productName(name) });
  }

  async addProductToCart(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
