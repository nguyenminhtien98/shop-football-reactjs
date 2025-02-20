import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    access_token: "",
    id: "",
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {name = '', email = '', access_token = '', _id = '', isAdmin, refreshToken = ''} = action.payload
            state.name = name || email;
            state.email = email;
            state.access_token = access_token;
            state.id = _id;
            state.isAdmin = isAdmin;
            state.refreshToken = refreshToken;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.id = '';
            state.isAdmin = '';
            state.refreshToken = '';
        }
    }
})

export const {updateUser, resetUser} = userSlide.actions
export default userSlide.reducer