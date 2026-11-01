
import { test as adBlock } from './base.fixture';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';   // adjust paths to your layout

export type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = adBlock.extend<Fixtures>({

  // Depends on homePage, so we are already on the home page when this runs
  loginPage: async ({ homePage, page }, use) => {
    await homePage.openLogin();
    await use(new LoginPage(page));
  },
});
