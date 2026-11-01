
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

test.describe('Home page - category sidebar', {tag:'@category'},() => {

  // ---------- On page load ----------
  test('Category sidebar and Women, Men, Kids are visible', async ({ homePage }) => {
    await softExpect(homePage.categorySidebar).toBeVisible();
    await softExpect(homePage.womenCategoryLink).toBeVisible();
    await softExpect(homePage.menCategoryLink).toBeVisible();
    await softExpect(homePage.kidsCategoryLink).toBeVisible();
  });

  // ---------- Pressing a category ----------
  test('Pressing Women shows Dress, Tops and Saree', async ({ homePage }) => {
    await homePage.womenCategoryLink.click();
    await softExpect(homePage.womenDress).toBeVisible();
    await softExpect(homePage.womenTops).toBeVisible();
    await softExpect(homePage.womenSaree).toBeVisible();
  });

  test('Pressing Men shows Tshirts and Jeans', async ({ homePage }) => {
    await homePage.menCategoryLink.click();
    await softExpect(homePage.menTshirts).toBeVisible();
    await softExpect(homePage.menJeans).toBeVisible();
  });

  test('Pressing Kids shows Dress and Tops & Shirts', async ({ homePage }) => {
    await homePage.kidsCategoryLink.click();
    await softExpect(homePage.kidsDress).toBeVisible();
    await softExpect(homePage.kidsTopsShirts).toBeVisible();
  });

  test('Opening one category closes the one that was open', async ({ homePage }) => {
    await homePage.menCategoryLink.click();
    await expect(homePage.menPanel).toBeVisible();
    await expect(homePage.womenPanel).toBeHidden();
  });

  // ---------- Clicking a sub link ----------
  test.describe('Home page - category sub links',{tag:'@sublinks'}, () => {
    // ---------- Women ----------
    test('Women > Dress opens the Dress page', async ({ homePage, page }) => {
      await homePage.womenCategoryLink.click();
      await homePage.womenDress.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/1');
      await expect(homePage.panelTitle).toHaveText('Women - Dress Products');
    });

    test('Women > Tops opens the Tops page', async ({ homePage, page }) => {
      await homePage.womenCategoryLink.click();
      await homePage.womenTops.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/2');
      await expect(homePage.panelTitle).toHaveText('Women - Tops Products');
    });

    test('Women > Saree opens the Saree page', async ({ homePage, page }) => {
      await homePage.womenCategoryLink.click();
      await homePage.womenSaree.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/7');
      await expect(homePage.panelTitle).toHaveText('Women - Saree Products');
    });

    // ---------- Men ----------
    test('Men > Tshirts opens the Tshirts page', async ({ homePage, page }) => {
      await homePage.menCategoryLink.click();
      await homePage.menTshirts.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/3');
      await expect(homePage.panelTitle).toHaveText('Men - Tshirts Products');
    });

    test('Men > Jeans opens the Jeans page', async ({ homePage, page }) => {
      await homePage.menCategoryLink.click();
      await homePage.menJeans.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/6');
      await expect(homePage.panelTitle).toHaveText('Men - Jeans Products');
    });

    // ---------- Kids ----------
    test('Kids > Dress opens the Dress page', async ({ homePage, page }) => {
      await homePage.kidsCategoryLink.click();
      await homePage.kidsDress.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/4');
      await expect(homePage.panelTitle).toHaveText('Kids - Dress Products');
    });

    test('Kids > Tops & Shirts opens its page', async ({ homePage, page }) => {
      await homePage.kidsCategoryLink.click();
      await homePage.kidsTopsShirts.click();
      await expect(page).toHaveURL(url => url.pathname === '/category_products/5');
      await expect(homePage.panelTitle).toHaveText('Kids - Tops & Shirts Products');
    });
  });

});

test('test women link',{tag:'@test1'},async ({homePage,page})=>{
  await homePage.womenCategoryLink.click();
  await homePage.womenDress.click();
  await homePage.womenCategoryLink.click();
  await homePage.womenTops.click();
  await homePage.womenCategoryLink.click();
  await homePage.womenSaree.click();

  await homePage.menCategoryLink.click();
  await homePage.menTshirts.click();
  await homePage.menCategoryLink.click();
  await homePage.menJeans.click();
  await homePage.kidsCategoryLink.click();
  await homePage.kidsDress.click();
  await homePage.kidsCategoryLink.click();
  await homePage.kidsTopsShirts.click();
  await page.waitForTimeout(2000);

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