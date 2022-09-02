import { configureStore } from '@reduxjs/toolkit';

import cartItemsSlide from './shoppingCart/cartItemsSlide';

export const store = configureStore({
    reducer: {
        cartItems: cartItemsSlide,
    },
});
