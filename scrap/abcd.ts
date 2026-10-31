import {chromium} from "playwright";

async function call1(){
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://chat.z.ai/");
    await page1.waitForTimeout(4000);
    await browser.close();
}
call1();