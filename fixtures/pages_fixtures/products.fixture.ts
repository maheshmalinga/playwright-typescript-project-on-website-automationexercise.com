import { test as base } from './base.fixture';     // the file with your ad blocking
import { ProductsPage } from '../../pages/products.page';

export type ProductsFixtures = {
  productsPage: ProductsPage;
};

export const test = base.extend<ProductsFixtures>({
  // Already on /products when the test starts
  productsPage: async ({ page }, use) => {
    const products = new ProductsPage(page);
    await products.goto();
    await use(products);
  },
});