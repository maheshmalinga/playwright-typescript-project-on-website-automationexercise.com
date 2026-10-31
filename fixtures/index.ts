import { mergeTests, expect } from '@playwright/test';
import {test as homeFixture } from './pages/home.fixture';

const test = mergeTests(

    homeFixture,
    

);

export {test,expect};
