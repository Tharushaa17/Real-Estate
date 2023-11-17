import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null, 
    loading: false, 
}

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }, 
        deleteUserStart: (state) => {
            state.loading = true;
        },
        destroyUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        destroyUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        singOutUserStart: (state) => {
            state.loading = true;
        },
    }
})

export const {
    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFaliure,
    deleteUserStart,
    destroyUserSuccess,
    destroyUserFailure,
    singOutUserStart
} = userSlice.actions;

export default userSlice.reducer;