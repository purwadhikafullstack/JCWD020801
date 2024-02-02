import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      title: 'card 2',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 25000,
      stock: 0,
      desc: 'Just FreshDirect 100% Grass-Fed Local 80% Lean Ground Beef, Fresh, Premium Packaging',
    },
    {
      id: 2,
      title: 'card 1',
      img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 25000,
      stock: 54,
      desc: 'FreshDirect Rotisserie Chicken, Raised w/o Antibiotics',
    },
    {
      id: 3,
      title: 'card 3',
      img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 17000,
      stock: 54,
      desc: 'Siggis Skyr Icelandic-Style Strained Non-Fat Yogurt, Mixed Berry and Acai',
    },
    {
      id: 4,
      title: 'card 4',
      img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 25000,
      stock: 54,
      desc: 'Just FreshDirect Local Angus RWA 90% Lean Ground Beef, Premium Packaging',
    },
    {
      id: 5,
      title: 'card 5',
      img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 32500,
      stock: 54,
      desc: 'Sprouts Organic Chicken Thin Sliced Boneless Breast',
    },
    {
      id: 6,
      title: 'card 6',
      img: 'https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 40400,
      stock: 54,
      desc: 'this is desc this is desc this is desc',
    },
    // 
  ],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setData } = productSlice.actions;

export default productSlice.reducer;
