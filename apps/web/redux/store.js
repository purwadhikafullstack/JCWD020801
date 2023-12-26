import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './customerSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
  },
});
