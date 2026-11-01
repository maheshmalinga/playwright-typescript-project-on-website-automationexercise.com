import { test, expect } from '../fixtures';

test.describe('Cart - number of products (guest)', () => {

  for (const count of [1, 2, 3]) {
    test(`adding ${count} product(s) shows ${count} row(s) in cart`, async ({ homePage, cartPage }) => {
      for (let id = 1; id <= count; id++) {
        await homePage.addProductToCart(id);
      }
      await homePage.openCart();
      await expect(cartPage.cartRows).toHaveCount(count);
    });
  }

  test('empty cart shows "Cart is empty!"', async ({ homePage, cartPage }) => {
    await homePage.openCart();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});

test.describe('Cart - right product is added (guest)',() => {

  test('product 1 is Blue Top',{tag:'@cart'}, async ({ homePage, cartPage }) => {
    await homePage.addProductToCart(1);
    await homePage.openCart();
    await expect(cartPage.productName(1)).toHaveText('Blue Top');
  });

  test('product 3 is Sleeveless Dress', async ({ homePage, cartPage }) => {
    await homePage.addProductToCart(3);
    await homePage.openCart();
    await expect(cartPage.productName(3)).toHaveText('Sleeveless Dress');
  });
});

test.describe('Cart - logged in user', () => {

  test('new logged in user has an empty cart', async ({ loggedInCart, homePage }) => {
    await homePage.openCart();
    await expect(loggedInCart.emptyCartMessage).toBeVisible();
  });

  test('logged in user adds one product', async ({ loggedInCart, homePage }) => {
    await homePage.addProductToCart(1);
    await homePage.openCart();
    await expect(loggedInCart.cartRows).toHaveCount(1);
  });

  test('logged in user adds three products', async ({ loggedInCart, homePage }) => {
    for (const id of [1, 2, 3]) {
      await homePage.addProductToCart(id);
    }
    await homePage.openCart();
    await expect(loggedInCart.cartRows).toHaveCount(3);
  });
});