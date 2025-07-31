import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: { cart: 0 },
  reducers: {
    addToCart: (state, action) => {
      console.log("action payload", action.payload);
      state.cart = action.payload;
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
