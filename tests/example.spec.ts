
// import { test, expect } from '@playwright/test';
// import {test1} from '../fixtures/base.fixtures';

// test1.beforeEach(async()=>{
//   console.log('before each global level');
// });

// test1('testcase1',  { tag: '@fast' },async ({ fixture1 }) => {
//   console.log('test case 1 execution')
//   await expect(fixture1).toHaveTitle(/Automation Testing Practice/);
// });

// test1('testcase2 @slow', async ({ fixture1 }) => {
//   console.log('test case 2 execution')
//   await expect(fixture1).toHaveTitle(/Automation Testing Practice/);
// });

// test1.describe('group1',async()=>{
//   test1.beforeEach(async()=>{
//     console.log('before each group level');
//   });

//   test1('testcase3', async ({ fixture1 }) => {
//     console.log('test case 3 execution')
//     await expect(fixture1).toHaveTitle(/Automation Testing Practice/);
//   });

//   test1('testcase4', { tag: '@fast' }, async ({ fixture1 }) => {
//     console.log('test case 4 execution')
//     await expect(fixture1).toHaveTitle(/Automation Testing Practice/);
//   });
// });

// test.describe.configure({ mode: 'serial' });