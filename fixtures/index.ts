import { mergeTests, expect } from '@playwright/test';
import {test as homeFixture } from './pages/home.fixture';
import {test as loginFixture} from './pages/login.fixture';
import {test as cartFixture} from './pages/cart.fixture';

const test = mergeTests(

    homeFixture,
    loginFixture,
    cartFixture,
    

);

export {test,expect};
