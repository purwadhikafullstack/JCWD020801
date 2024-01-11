import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import customerSlice from './customerSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    customer: customerSlice,
    cart: cartSlice,
  },
});
