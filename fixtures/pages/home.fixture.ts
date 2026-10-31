
import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

/**
 * Fixtures owned by the Home feature.
 * Keep this file focused on the Home page only — one file per concern.
 */
export type HomeFixtures = {
  /** A ready-to-use HomePage instance, already navigated to the home URL. */
  homePage: HomePage;
};

/**
 * Extended Playwright `test` object with Home fixtures.
 *
 * `homePage` is **test-scoped** (fresh per test) and **auto-navigated**:
 * by the time the test body runs, the browser is already on the home URL.
 *
 * If you need a *bare* page object without navigation, add a second fixture
 * (`homePageNoNav`) or call `homePage.goto()` in `beforeEach` instead.
 */
export const test = base.extend<HomeFixtures>({
  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.goto();

    await use(home);

    // No teardown: `page` lifecycle is owned by Playwright.
    // Add explicit teardown only if you acquire resources
    // (e.g., storage state, temp files, test users).
  },
});

