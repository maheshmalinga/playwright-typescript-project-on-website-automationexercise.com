import { test, expect } from '../fixtures';

const softExpect = expect.configure({ soft: true });

test.describe('Products - page load', () => {

  test('Products page opens with the All Products title', { tag: '@smoke' }, async ({ productsPage, page }) => {
    await expect(page).toHaveURL(url => url.pathname === '/products');
    await expect(productsPage.pageTitle).toHaveText('All Products');
    await expect(productsPage.productCards.first()).toBeVisible();
  });

  test('Search box and button are visible', async ({ productsPage }) => {
    await softExpect(productsPage.searchInput).toBeVisible();
    await softExpect(productsPage.searchButton).toBeVisible();
  });

  test('Category sidebar and brands are visible', async ({ productsPage }) => {
    await softExpect(productsPage.categorySidebar).toBeVisible();
    await softExpect(productsPage.womenCategoryLink).toBeVisible();
    await softExpect(productsPage.menCategoryLink).toBeVisible();
    await softExpect(productsPage.brandLinks.first()).toBeVisible();
  });
});

test.describe('Products - product details on the list', () => {

  const products = [
    { id: 1, name: 'Blue Top',         price: 'Rs. 500' },
    { id: 2, name: 'Men Tshirt',       price: 'Rs. 400' },
    { id: 3, name: 'Sleeveless Dress', price: 'Rs. 1000' },
  ];

  for (const { id, name, price } of products) {
    test(`product ${id} shows ${name} and ${price}`, async ({ productsPage }) => {
      await softExpect(productsPage.productName(id)).toHaveText(name);
      await softExpect(productsPage.productPrice(id)).toHaveText(price);
    });
  }

  test('View Product opens the product details page', async ({ productsPage, page }) => {
    await productsPage.viewProductLink(1).click();
    await expect(page).toHaveURL(url => url.pathname === '/product_details/1');
  });
});

test.describe('Products - search', () => {

  test('searching Jeans shows only jeans', { tag: '@smoke' }, async ({ productsPage, page }) => {
    await productsPage.searchFor('Jeans');

    await expect(page).toHaveURL(url => url.searchParams.get('search') === 'Jeans');
    await expect(productsPage.pageTitle).toHaveText('Searched Products');

    const names = await productsPage.productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain('jeans');
    }
  });

  test('searching something that does not exist shows no products', async ({ productsPage }) => {
    await productsPage.searchFor('zzzzzzzz');

    await expect(productsPage.pageTitle).toHaveText('Searched Products');
    await expect(productsPage.productCards).toHaveCount(0);
  });
});

test.describe('Products - add to cart popup', () => {

  test('Add to cart shows the Added popup', { tag: '@smoke' }, async ({ productsPage }) => {
    await productsPage.addToCartButton(1).click();

    await expect(productsPage.cartModal).toBeVisible();
    await expect(productsPage.modalMessage).toBeVisible();
  });

  test('Continue Shopping closes the popup', async ({ productsPage }) => {
    await productsPage.addToCartButton(1).click();
    await productsPage.continueShoppingButton.click();

    await expect(productsPage.cartModal).toBeHidden();
  });

  test('View Cart in the popup opens the cart with the product', async ({ productsPage, page }) => {
    await productsPage.addToCartButton(1).click();
    await productsPage.viewCartLink.click();

    await expect(page).toHaveURL(url => url.pathname === '/view_cart');
    await expect(page.locator('#product-1')).toBeVisible();
  });

  test('two different products can be added one after another', async ({ productsPage, page }) => {
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);
    await page.goto('/view_cart');

    await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(2);
  });
});

test.describe('Products - sidebar navigation', () => {

  test('Women > Dress opens its page', async ({ productsPage, page }) => {
    await productsPage.womenCategoryLink.click();
    await productsPage.womenDress.click();

    await expect(page).toHaveURL(url => url.pathname === '/category_products/1');
    await expect(productsPage.pageTitle).toHaveText('Women - Dress Products');
  });

  test('Men > Jeans opens its page', async ({ productsPage, page }) => {
    await productsPage.menCategoryLink.click();
    await productsPage.menJeans.click();

    await expect(page).toHaveURL(url => url.pathname === '/category_products/6');
    await expect(productsPage.pageTitle).toHaveText('Men - Jeans Products');
  });

  const brands = ['Polo', 'H&M', 'Madame', 'Biba'];

  for (const brand of brands) {
    test(`brand ${brand} shows its products page`, async ({ productsPage }) => {
      await productsPage.brandLink(brand).click();
      await expect(productsPage.pageTitle).toHaveText(`Brand - ${brand} Products`);
      await expect(productsPage.productCards.first()).toBeVisible();
    });
  }
});

test.describe('Products - footer subscription', () => {

  test('subscribing with an email shows the success message', async ({ productsPage }) => {
    await productsPage.subscribe('test@example.com');
    await expect(productsPage.subscribeSuccessMessage).toBeVisible();
  });
});