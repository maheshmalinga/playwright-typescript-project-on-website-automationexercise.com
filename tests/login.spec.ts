import { test, expect } from '../fixtures';
import { validUser } from '../test-data/users';

const softExpect = expect.configure({ soft: true });
const REQUIRED_MSG = 'Please fill out this field.';

test.describe('Login', () => {

  test('login page is displayed', { tag: '@smoke' }, async ({ loginPage, page }) => {
    await expect(page).toHaveURL(url => url.pathname === '/login');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('login and signup fields are visible and usable', async ({ loginPage }) => {
    const elements = [
      loginPage.loginEmailInput,
      loginPage.loginPasswordInput,
      loginPage.loginButton,
      loginPage.signupNameInput,
      loginPage.signupEmailInput,
      loginPage.signupButton,
    ];
    for (const element of elements) {
      await softExpect(element).toBeVisible();
      await softExpect(element).toBeEnabled();
    }
  });

  test('login with valid credentials', { tag: ['@smoke', '@integration'] }, async ({ loginPage }) => {
    await loginPage.login(validUser.email, validUser.password);
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('logout returns to the login page', async ({ loginPage, page }) => {
    await loginPage.login(validUser.email, validUser.password);
    await loginPage.logoutLink.click();
    await expect(page).toHaveURL(url => url.pathname === '/login');
  });

  test('login with empty credentials shows the browser message', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.loginEmailInput).toHaveJSProperty('validationMessage', REQUIRED_MSG);
  });

  test('login with no password shows the browser message', async ({ loginPage }) => {
    await loginPage.login('123@gmail.com', '');
    await expect(loginPage.loginPasswordInput).toHaveJSProperty('validationMessage', REQUIRED_MSG);
  });

  // Same as @pytest.mark.parametrize
  const invalidLogins = [
    { title: 'correct email, wrong password', email: validUser.email, password: '123456' },
    { title: 'wrong email, correct password', email: '123@gmail.com', password: validUser.password },
    { title: 'wrong email, wrong password',   email: '123@gmail.com', password: '123456' },
  ];

  for (const { title, email, password } of invalidLogins) {
    test(`login with invalid credentials: ${title}`, async ({ loginPage }) => {
      await loginPage.login(email, password);
      await expect(loginPage.loginErrorMessage).toBeVisible();
    });
  }
});

test.describe('Signup', () => {

  const newUsers = [
    { name: 'mahesh',   email: 'uisnothuman@gmail.com' },
    { name: 'kumar123', email: 'uishuman21@gmail.com' },
  ];

  for (const { name, email } of newUsers) {
    test(`signup with a new email: ${name}`, { tag: ['@smoke', '@integration'] }, async ({ loginPage, page }) => {
      await loginPage.signup(name, email);
      await expect(page).toHaveURL(url => url.pathname === '/signup');
    });
  }

  test('signup with a registered email shows an error', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.signup('mahesh', validUser.email);
    await expect(loginPage.emailAlreadyExistError).toBeVisible();
  });

  test('signup with empty name shows the browser message', async ({ loginPage }) => {
    await loginPage.signup('', '');
    await expect(loginPage.signupNameInput).toHaveJSProperty('validationMessage', REQUIRED_MSG);
  });

  test('signup with empty email shows the browser message', async ({ loginPage }) => {
    await loginPage.signup('mahesh', '');
    await expect(loginPage.signupEmailInput).toHaveJSProperty('validationMessage', REQUIRED_MSG);
  });
});