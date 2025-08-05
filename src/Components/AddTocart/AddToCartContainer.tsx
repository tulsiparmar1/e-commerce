import AddToCart from "@/Components/AddTocart/AddToCart";
import ProductCard from "@/Components/Product/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./AddToCart.module.css";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";

function AddToCartContainer() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchAddedCart = async () => {
    setLoading(true);
    const intervalId = setInterval(() =>
      setProgress((prev) => (prev < 90 ? prev + 10 : prev))
    );
    try {
      const { data } = await axios.get("/api/cart/getcart");
      setCarts(data[0]);
      setProgress(100);
    } catch (error) {
      console.log("error occurred", error);
    } finally {
      setLoading(false);
    }
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    fetchAddedCart();
  }, []);
  useEffect(() => {
    console.log("cards from patent components", carts);
  }, [carts]);
  return (
    <>
      <div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        <div
          className={style.mainContainer}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {/* items that are added to cart */}
          <div
            className={style.cartItems}
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
              height: "500px",
              overflowY: "auto",
            }}
          >
            {carts?.items?.map((cart) => {
              return <AddToCart product={cart} setCarts={setCarts}></AddToCart>;
            })}
          </div>
          {!loading && (
            <div className={style.orderMain}>
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
          )}
        </div>
      </div>
    </>
  );
}

export default AddToCartContainer;
