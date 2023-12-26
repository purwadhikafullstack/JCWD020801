import { createSlice } from '@reduxjs/toolkit';
import dummyProduct from '../src/assets/navbar/bowl.png';

const initialState = {
  data: [
    {
      id: 1,
      name: 'Family Tree Farms Jumbo Ultra-Premium Blueberries, Case',
      price: 67000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Family Tree Farms',
      price: 5000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case, Ultra-Premium Blueberries,',
      price: 45000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 4,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
      price: 32000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 5,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
      price: 26000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 6,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
      price: 17000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 7,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
      price: 45000,
      img: dummyProduct,
      quantity: 1,
    },
    {
      id: 8,
      name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
      price: 45000,
      img: dummyProduct,
      quantity: 1,
    },
  ],
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
  },
});

export const { addToCart, removeFromCart, subtractQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
