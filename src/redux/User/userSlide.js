import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    access_token: ""
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {name, email, access_token} = action.payload
            state.name = name || email;
            state.email = email;
            state.access_token = access_token
        }
    }
})

export const {updateUser} = userSlide.actions
export default userSlide.reducer