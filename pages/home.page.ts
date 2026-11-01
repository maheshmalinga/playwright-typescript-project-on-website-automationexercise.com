import { Page, Locator ,expect} from '@playwright/test';

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

    // CATEGORY
    readonly categorySidebar : Locator;
    readonly womenCategoryLink: Locator;
    readonly menCategoryLink: Locator;
    readonly kidsCategoryLink: Locator;

    // women panel
    readonly womenPanel :Locator;
    readonly womenDress : Locator;
    readonly womenTops: Locator;
    readonly womenSaree:Locator;

    //men Panel 
    readonly menPanel :Locator;
    readonly menTshirts :Locator;
    readonly menJeans :Locator;

    //Kids panel 
    readonly kidsPanel :Locator;
    readonly kidsDress :Locator;
    readonly kidsTopsShirts :Locator;
    readonly panelTitle :Locator;

    // cart - related
    readonly cartModal: Locator;
    readonly continueShoppingButton: Locator;


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
        // category
        this.categorySidebar   = page.locator('.category-products');
        this.womenCategoryLink = this.categorySidebar.locator('a[href="#Women"]')//getByRole('link', { name: 'Women', exact: true });
        this.menCategoryLink   = this.categorySidebar.locator('a[href="#Men"]')//getByRole('link', { name: 'Men', exact: true });
        this.kidsCategoryLink  = this.categorySidebar.locator('a[href="#Kids"]')//getByRole('link', { name: 'Kids', exact: true });
        
        //women Panel
        this.womenPanel = this.page.locator('#Women')
        this.womenDress = this.womenPanel.getByRole('link', { name: 'Dress', exact: true });
        this.womenTops  = this.womenPanel.getByRole('link', { name: 'Tops', exact: true });
        this.womenSaree  = this.womenPanel.getByRole('link', { name: 'Saree', exact: true });

        // men panel
        this.menPanel = this.page.locator('#Men')
        this.menTshirts = this.menPanel.getByRole('link', { name: 'Tshirts', exact: true });
        this.menJeans  = this.menPanel.getByRole('link', { name: 'Jeans', exact: true });

        // kids panel
        this.kidsPanel = this.page.locator('#Kids')
        this.kidsDress = this.kidsPanel.getByRole('link', { name: 'Dress', exact: true });
        this.kidsTopsShirts  = this.kidsPanel.getByRole('link', { name: 'Tops & Shirts ', exact: true });

        // panel title 
        this.panelTitle= this.page.locator('.title');

        // cart - realted
        this.cartModal = page.locator('#cartModal');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

        
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

    async getPanelTitle():Promise<string|null>{
        return this.panelTitle.textContent();
    }

    // ---------- Add to cart ----------
    async addProductToCart(productId: number): Promise<void> {
        // each product has two "Add to cart" links, so .first() picks one
        await this.page.locator(`a.add-to-cart[data-product-id="${productId}"]`).first().click();
        await this.continueShoppingButton.click();
        await expect(this.cartModal).toBeHidden();   // wait until the popup is gone
    }
}