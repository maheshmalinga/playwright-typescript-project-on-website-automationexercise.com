// fixtures/base.fixture.ts
import { test as base } from '@playwright/test';

export const test = base.extend<{ blockAds: void }>({
  blockAds: [
    async ({ page }, use) => {
      await page.route(
        /googlesyndication|doubleclick|googleadservices|adservice\.google/,
        route => route.abort()
      );
      await use();
    },
    { auto: true },   // runs automatically, no need to request it
  ],
});
