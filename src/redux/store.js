import { configureStore } from '@reduxjs/toolkit';
import userSlide from './User/userSlide';
import cartItemsSlide from './shoppingCart/cartItemsSlide';

export const store = configureStore({
    reducer: {
        cartItems: cartItemsSlide,
        user: userSlide
    },
});

