import {chromium} from "playwright";

async function call1(){
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://www.automationexercise.com/");
    await page1.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'Men' ,exact:true}).click();
    await page1.waitForTimeout(2000);
    await browser.close();
}
call1();