import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {}
};

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setData } =
    customerSlice.actions;

export default customerSlice.reducer