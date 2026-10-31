
import {test,expect} from '../fixtures';

import type { HomePage } from '../pages/home.page'; 

const softExpect = expect.configure({ soft: true });

test.describe('Home page - header', () => {
  test('header and logo are visible', async ({ homePage }) => {
    await softExpect(homePage.header).toBeVisible();
    await softExpect(homePage.logo).toBeVisible();
  });

  test('all header links are visible', async ({ homePage }) => {
    const links = [
      homePage.homeLink,
      homePage.productsLink,
      homePage.cartLink,
      homePage.signupLoginLink,
      homePage.testCasesLink,
      homePage.apiTestingLink,
      homePage.videoTutorialsLink,
      homePage.contactUsLink,
    ];

    for (const link of links) {
      await softExpect(link).toBeVisible();
    }
  });

  // External site (YouTube): only check the link target, don't navigate away
  test('Video Tutorials link points to YouTube', async ({ homePage }) => {
    await expect(homePage.videoTutorialsLink).toHaveAttribute('href', /youtube/);
  });
});

test.describe('Home page - header navigation', () => {
  const navCases = [
    { name: 'Home',          open: (p: HomePage) => p.openHome(),         url: '/' },
    { name: 'Products',      open: (p: HomePage) => p.openProducts(),     url: '/products' },
    { name: 'Cart',          open: (p: HomePage) => p.openCart(),         url: '/view_cart' },
    { name: 'Signup / Login', open: (p: HomePage) => p.openLogin(),       url: '/login' },
    { name: 'Test Cases',    open: (p: HomePage) => p.openTestCases(),    url: '/test_cases'},
    { name: 'API Testing',   open: (p: HomePage) => p.openapiTesting(),   url: '/api_list' },
    { name: 'Contact us',    open: (p: HomePage) => p.openContactUs(),    url: '/contact_us' },
    
  ];

  for (const { name, open, url } of navCases) {
    test(`${name} link opens the correct page`, async ({ homePage, page }) => {
      await open(homePage);
      await expect(page).toHaveURL(url);
    });
  }
});

// test("Home page - Verify all header links are visible",async ({homePage,page})=>{
  
//   await softExpect(homePage.homeLink).toBeVisible();
//   await softExpect(homePage.productsLink).toBeVisible();
//   await softExpect(homePage.cartLink).toBeVisible();
//   await softExpect(homePage.signupLoginLink).toBeVisible();
//   // await softExpect(homePage.testCasesLink).toBeVisible();
//   // await softExpect(homePage.apiTestingLink).toBeVisible();
//   await softExpect(homePage.videoTutorialsLink).toBeVisible();
//   await softExpect(homePage.contactUsLink).toBeVisible();

// });


// test('Home page - Home link keeps user on home page', async ({ homePage, page }) => {
//   await homePage.openHome();
//   await expect(page).toHaveURL(/automationexercise\.com\/?(#.*)?$/);
// });

// test('Home page - Products link opens Products page', async ({ homePage, page }) => {
//   await homePage.openProducts();
//   await expect(page).toHaveURL(/\/products/);
// });

// test('Home page - Cart link opens Cart page', async ({ homePage, page }) => {
//   await homePage.openCart();
//   await expect(page).toHaveURL(/\/view_cart/);
// });

// test('Home page - Signup / Login link opens Login page', async ({ homePage, page }) => {
//   await homePage.openLogin();
//   await expect(page).toHaveURL(/\/login/);
// });

// test('Home page - Test Cases link opens Test Cases page', async ({ homePage, page }) => {
//   await homePage.openTestCases();
//   await expect(page).toHaveURL(/\/test_cases/);
// });

// test('Home page - API Testing link opens API list page', async ({ homePage, page }) => {
//   await homePage.openapiTesting();
//   await expect(page).toHaveURL(/\/api_list/);
// });

// test('Home page - Contact us link opens Contact Us page', async ({ homePage, page }) => {
//   await homePage.openContactUs();
//   await expect(page).toHaveURL(/\/contact_us/);
// });

// // Video Tutorials goes to an external site (YouTube), so we only check the link target
// test('Home page - Video Tutorials link points to YouTube', async ({ homePage }) => {
//   await expect(homePage.videoTutorialsLink).toHaveAttribute('href', /youtube/);
// });