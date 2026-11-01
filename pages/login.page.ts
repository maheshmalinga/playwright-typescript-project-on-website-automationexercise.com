import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    // Login form
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;

    // Signup form
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly emailAlreadyExistError: Locator;

    // After login
    readonly logoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.loginEmailInput    = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.getByPlaceholder('Password');
        this.loginButton        = page.getByRole('button',{name:'Login'});
        this.loginErrorMessage  = page.getByText('Your email or password is incorrect!');

        this.signupNameInput        = page.getByPlaceholder('Name');
        this.signupEmailInput       = page.locator('[data-qa="signup-email"]');
        this.signupButton           = page.getByRole('button',{name:'Signup'});
        this.emailAlreadyExistError = page.getByText('Email Address already exist!');

        // href locator, same reason as the category links: the icon can break getByRole names
        this.logoutLink = page.locator('a[href="/logout"]');
    }

    // ---------- Actions ----------
    async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async signup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}