import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import customerSlice from "./customerSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    customer: customerSlice
  },
});