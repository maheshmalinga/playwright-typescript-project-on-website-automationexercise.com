import { Page, Locator } from '@playwright/test';

export class HomePage {
    
    readonly page: Page;

    // Header (shown on every page)
    readonly header: Locator;
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly testCasesLink: Locator;
    readonly apiTestingLink: Locator;
    readonly videoTutorialsLink: Locator;
    readonly contactUsLink: Locator;


    constructor(page: Page) {
        this.page = page;

        this.header = page.locator('header');
        this.logo = page.getByAltText('Website for automation practice');
        this.homeLink = this.header.getByRole('link', { name: 'Home' });
        this.productsLink = this.header.getByRole('link', { name: 'Products' });
        this.cartLink = this.header.getByRole('link', { name: 'Cart' });
        this.signupLoginLink = this.header.getByRole('link', { name: 'Signup / Login' });
        this.testCasesLink = this.header.getByRole('link', { name: 'Test Cases' });
        this.apiTestingLink = this.header.getByRole('link', { name: 'API Testing' });
        this.videoTutorialsLink = this.header.getByRole('link', { name: 'Video Tutorials' });
        this.contactUsLink = this.header.getByRole('link', { name: 'Contact us' });

        }

    // ---------- Navigation ----------
    async goto(): Promise<void> {
        await this.page.goto('/', { 
            waitUntil: 'domcontentloaded', 
            timeout:60000 ,
        });
    }

    async openHome(): Promise<void> { 
        await this.homeLink.click(); 
    }

    async openProducts(): Promise<void> { 
        await this.productsLink.click(); 
    }
    async openCart(): Promise<void> { 
        await this.cartLink.click(); 
    }
    async openLogin(): Promise<void> { 
        await this.signupLoginLink.click(); 
    }
    async openTestCases(): Promise<void> { 
        await this.testCasesLink.click(); 
    }
    async openapiTesting(): Promise<void> { 
        await this.apiTestingLink.click(); 
    }
    async openVideoTutorials(): Promise<void> { 
        await this.videoTutorialsLink.click(); 
    }
    async openContactUs(): Promise<void> { 
        await this.contactUsLink.click(); 
    }

}