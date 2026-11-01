import { mergeTests, expect } from '@playwright/test';
import {test as homeFixture } from './pages_fixtures/home.fixture';
import {test as loginFixture} from './pages_fixtures/login.fixture';
import {test as cartFixture} from './pages_fixtures/cart.fixture';
import { test as productsTest } from './pages_fixtures/products.fixture';

const test = mergeTests(

    homeFixture,
    loginFixture,
    cartFixture,
    productsTest,

);

export {test,expect};
