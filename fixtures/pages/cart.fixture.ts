import { expect } from '@playwright/test';
import { test as base } from './base.fixture';          //  file with the ad blocking
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { validUser } from '../../test-data/users';

export type CartFixtures = {
  cartPage: CartPage;
  loggedInCart: CartPage;
};

export const test = base.extend<CartFixtures>({
  // Plain cart page object, no navigation
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Logs in, hands over the cart page, then always empties the cart afterwards
  loggedInCart: async ({ page }, use) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.openLogin();
    await login.login(validUser.email, validUser.password);
    await expect(login.logoutLink).toBeVisible();

    await use(cart);

    // Teardown: runs even if the test failed
    await home.openCart();
    await cart.deleteAllProducts();
  },
});