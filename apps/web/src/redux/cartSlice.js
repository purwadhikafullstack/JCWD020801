import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  totalProduct: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.data.find(
        (item) => item.id === action.payload.id,
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.data.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    subtractQuantity: (state, action) => {
      const itemInCart = state.data.find(
        (item) => item.id === action.payload.id,
      );
      if (itemInCart.quantity === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      } else {
        itemInCart.quantity--;
      }
    },
    addTotal: (state, action) => {
      state.totalProduct = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, subtractQuantity, addTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
