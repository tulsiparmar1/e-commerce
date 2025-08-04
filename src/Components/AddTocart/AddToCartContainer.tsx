import AddToCart from "@/Components/AddTocart/AddToCart";
import ProductCard from "@/Components/Product/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./AddToCart.module.css";

function AddToCartContainer() {
  const [carts, setCarts] = useState([]);
  const fetchAddedCart = async () => {
    try {
      const { data } = await axios.get("/api/cart/getcart");
      setCarts(data[0]);
    } catch (error) {
      console.log("error occurred", error);
    }
  };
  useEffect(() => {
    console.log("cartData", carts.items);
  }, [carts]);
  useEffect(() => {
    fetchAddedCart();
  }, []);
  return (
    <>
      <div>
        <h2 style={{ color: "gray" }}>Your Cart</h2>
        <div style={{ display: "flex", gap: "30px" }}>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",

              width: "100%",
            }}
          >
            {" "}
            {carts?.items?.map((cart) => {
              return <AddToCart product={cart}></AddToCart>;
            })}
          </div>
        </div>
        <div className={style.main}>
          <h3>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Sub Total:</p>
            <p>
              {" "}
              {carts?.items?.reduce(
                (acc, cart) => acc + cart.quantity * cart.productId.price,
                0
              )}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Discount</p>
            <p>0</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid  gray",
            }}
          >
            <p>Total</p>

            <p>
              {" "}
              {carts?.items?.reduce(
                (acc, cart) => acc + cart.quantity * cart.productId.price,
                0
              )}
            </p>
          </div>
          <button
            style={{
              backgroundColor: "purple",
              height: "40px",
              color: "white",
              width: "100%",
              border: "none",
            }}
          >
            Go to CheckOut
          </button>
        </div>
      </div>
    </>
  );
}

export default AddToCartContainer;
