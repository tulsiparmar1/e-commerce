import { RootState } from "@/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "@/Components/Product/ProductCard";

function index() {
  const { cart } = useSelector((state: RootState) => state.Cart);
  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);
  return (
    <div>
      {cart.map((item) => (
        <>
          <ProductCard product={item}></ProductCard>
        </>
      ))}
    </div>
  );
}
export default index;
