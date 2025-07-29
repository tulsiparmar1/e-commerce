import React, { useEffect, useState } from "react";
import { Product } from "@/slices/productSlice";
import style from "../Product/Product.module.scss";
import Image from "next/image";
import { Skeleton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { cartSliceActions } from "@/slices/cartSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { useRouter } from "next/router";

function ProductDetail({ product }: { product: Product }) {
  const allSizes = ["S", "M", "XL", "XXl", "XXXl"];
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [count, setCount] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCountDecrement = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount((prev) => prev - 1);
    }
  };
  const handleCountIncrement = () => {
    if (count > product.stock) {
      return;
    }
    setCount((count) => count + 1);
  };

  const handleBuyNow = () => {
    product.selectedSize = selectedSize;
    product.selectedColor = selectedColor;
    product.quantity = count;
    console.log("updated Product", product);
    router.push("/buynow");
  };
  useEffect(() => {});
  return (
    <div>
      {product.sizes ? (
        <div className={style.productDetailContainer}>
          <div className={style.productImage}>
            {product.images && (
              <Image
                src={`/${product?.images?.[0]?.url}`} //chnage this '/' once you store your images in cloudinary or any other platform
                alt={product.images[0].alt}
                height={300}
                width={300}
              />
            )}
          </div>
          <div>
            <div
              className={style.productDetail}
              style={{
                justifyContent: "center",
                paddingLeft: "35px",
              }}
            >
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p style={{ color: "gray" }}>Fabric:Cotton</p>
                <p>Size</p>{" "}
                <ul className={style.size}>
                  {" "}
                  {allSizes.map((item) => {
                    return (
                      <button
                        onClick={() => setSelectedSize(item)}
                        disabled={!product?.sizes?.includes(item)}
                        style={{
                          border: "none",
                          padding: "6px",
                          backgroundColor:
                            item === selectedSize
                              ? "purple"
                              : !product?.sizes?.includes(item)
                              ? "rgba(128, 128, 128, 0.39)"
                              : "rgba(128, 128, 128, 0.39)",
                          color: item === selectedSize && "white",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </ul>
              </div>
              <div className={style.colors}>
                colors:{" "}
                {product.colors.map((color) => (
                  <Tooltip title={color} placement="top">
                    <button
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? "4px solid gray"
                            : "1px solid gray",
                      }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  </Tooltip>
                ))}
              </div>
              <div style={{ display: "flex", gap: "2px" }}>
                <button
                  onClick={handleCountDecrement}
                  style={{ border: "1px solid gray", width: "40px" }}
                >
                  -
                </button>
                <span
                  style={{
                    background: "rgba(241, 238, 238, 1)",
                    width: "40px",
                    border: "1px solid gray",
                    textAlign: "center",
                  }}
                >
                  {count}
                </span>
                <button
                  onClick={handleCountIncrement}
                  style={{ border: "1px solid gray", width: "40px" }}
                >
                  +
                </button>
              </div>
              <div className={style.actions}>
                <button onClick={handleBuyNow}>Buy Now</button>
                <button
                  onClick={() => dispatch(cartSliceActions.addToCart(product))}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={style.skeletonStyle}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            gap: "40px",
          }}
        >
          <div>
            <Skeleton
              sx={{ bgcolor: "grey.1000" }}
              variant="rectangular"
              width={300}
              height={318}
            />
          </div>
          <div>
            <Box
              sx={{
                width: 400,
                height: 300,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Skeleton height={100} />
              <Skeleton animation="wave" height={200} />
              <Skeleton animation="wave" height={200} />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
