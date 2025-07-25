import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slices/productSlice.ts";

const store = configureStore({
  reducer: {
    Product: ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
