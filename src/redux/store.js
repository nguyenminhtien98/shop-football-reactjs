import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlide';
import cartItemsSlide from './shoppingCart/cartItemsSlide';

export const store = configureStore({
    reducer: {
        cartItems: cartItemsSlide,
        user: userReducer
    },
});
