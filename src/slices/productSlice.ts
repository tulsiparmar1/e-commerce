import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  sizes: [];
  colors: [];
  category: string;
  isNewArrival: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
  images: { url: string; alt: string }[];
  stock: number;
};

interface ProductState {
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
};
const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    fetchProduct: (state, action) => {
      console.log("state data", action.payload);
      state.products = action.payload;
    },
  },
});

export const productSliceAction = productSlice.actions;

export default productSlice.reducer;
