import { type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly title: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  productName(name: string): Locator {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: name });
  }

  async finishPurchase(): Promise<void> {
    await this.finishButton.click();
  }
}
