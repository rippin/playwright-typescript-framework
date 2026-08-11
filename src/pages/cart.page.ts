import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly title: Locator;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartList = page.getByTestId('cart-list');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  cartItem(name: string): Locator {
    return this.cartList
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByTestId('inventory-item-name').filter({ hasText: name }) });
  }

  productName(name: string): Locator {
    return this.cartItem(name).getByTestId('inventory-item-name');
  }

  productPrice(name: string): Locator {
    return this.cartItem(name).getByTestId('inventory-item-price');
  }

  async removeProduct(name: string): Promise<void> {
    await this.cartItem(name).getByRole('button', { name: 'Remove' }).click();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
