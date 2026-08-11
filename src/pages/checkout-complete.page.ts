import { type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly title: Locator;
  readonly confirmationHeader: Locator;
  readonly confirmationMessage: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.title = page.getByTestId('title');
    this.confirmationHeader = page.getByTestId('complete-header');
    this.confirmationMessage = page.getByTestId('complete-text');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }
}
