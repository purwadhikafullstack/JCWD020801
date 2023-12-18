import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";

export const store = configureStore({
    reducer: {
        customer: customerSlice
    }
})