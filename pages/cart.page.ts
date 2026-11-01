import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartRows: Locator;
    readonly emptyCartMessage: Locator;
    readonly deleteButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.emptyCartMessage = page.locator('#empty_cart').getByText('Cart is empty!');
        this.deleteButtons = page.locator('.cart_quantity_delete');
    }

    // Name link of one product row, e.g. productName(1) -> "Blue Top"
    productName(productId: number): Locator {
        return this.page.locator(`#product-${productId} td:nth-child(2) a`);
    }

    async deleteAllProducts(): Promise<void> {
        while ((await this.deleteButtons.count()) > 0) {
            const before = await this.deleteButtons.count();
            await this.deleteButtons.first().click();
            await expect(this.deleteButtons).toHaveCount(before - 1);   // wait for the row to disappear
        }
    }
}