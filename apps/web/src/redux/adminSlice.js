import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
  };

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        setDataAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setDataAdmin } =
  adminSlice.actions;

export default adminSlice.reducer;