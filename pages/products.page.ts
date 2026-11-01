import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    // Search
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    // Product list
    readonly pageTitle: Locator;
    readonly productCards: Locator;
    readonly productNames: Locator;

    // "Added!" popup
    readonly cartModal: Locator;
    readonly modalMessage: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLink: Locator;

    // Sidebar
    readonly categorySidebar: Locator;
    readonly womenCategoryLink: Locator;
    readonly womenDress: Locator;
    readonly menCategoryLink: Locator;
    readonly menJeans: Locator;
    readonly brandLinks: Locator;

    // Footer subscription
    readonly subscribeEmailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscribeSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput  = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');

        this.pageTitle    = page.locator('.features_items .title');
        this.productCards = page.locator('.features_items .product-image-wrapper');
        // .productinfo is the visible part of a card; the hover overlay repeats the same text
        this.productNames = page.locator('.features_items .productinfo p');

        this.cartModal              = page.locator('#cartModal');
        this.modalMessage           = this.cartModal.getByText('Your product has been added to cart.');
        this.continueShoppingButton = this.cartModal.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink           = this.cartModal.getByRole('link', { name: 'View Cart' });

        this.categorySidebar   = page.locator('.category-products');
        this.womenCategoryLink = this.categorySidebar.locator('a[href="#Women"]');
        this.womenDress        = page.locator('#Women').getByRole('link', { name: 'Dress', exact: true });
        this.menCategoryLink   = this.categorySidebar.locator('a[href="#Men"]');
        this.menJeans          = page.locator('#Men').getByRole('link', { name: 'Jeans', exact: true });
        this.brandLinks        = page.locator('.brands-name a');

        // the id really is spelled "susbscribe" in the site's HTML
        this.subscribeEmailInput     = page.locator('#susbscribe_email');
        this.subscribeButton         = page.locator('#subscribe');
        this.subscribeSuccessMessage = page.getByText('You have been successfully subscribed!');
    }

    // ---------- Locators that depend on a value ----------
    // The card of one product, found through its Add to cart button
    private productCard(productId: number): Locator {
        return this.page.locator('.product-image-wrapper', {
            has: this.page.locator(`.productinfo a[data-product-id="${productId}"]`),
        });
    }

    productName(productId: number): Locator {
        return this.productCard(productId).locator('.productinfo p');
    }

    productPrice(productId: number): Locator {
        return this.productCard(productId).locator('.productinfo h2');
    }

    addToCartButton(productId: number): Locator {
        return this.page.locator(`.productinfo a.add-to-cart[data-product-id="${productId}"]`);
    }

    viewProductLink(productId: number): Locator {
        return this.page.locator(`a[href="/product_details/${productId}"]`);
    }

    brandLink(brandName: string): Locator {
        return this.page.locator(`.brands-name a[href="/brand_products/${brandName}"]`);
    }

    // ---------- Actions ----------
    async goto(): Promise<void> {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async searchFor(text: string): Promise<void> {
        await this.searchInput.fill(text);
        await this.searchButton.click();
    }

    // Adds a product and closes the popup, so the next click is not blocked
    async addProductToCart(productId: number): Promise<void> {
        await this.addToCartButton(productId).click();
        await this.continueShoppingButton.click();
        await this.cartModal.waitFor({ state: 'hidden' });
    }

    async subscribe(email: string): Promise<void> {
        await this.subscribeEmailInput.fill(email);
        await this.subscribeButton.click();
    }
}