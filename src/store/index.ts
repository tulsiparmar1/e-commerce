import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slices/productSlice.ts";
import cartSlice from "../slices/cartSlice.ts";

const store = configureStore({
  reducer: {
    Product: ProductReducer,
    Cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
