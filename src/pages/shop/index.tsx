import axios from "axios";
import React, { useEffect, useState } from "react";
import { productSliceAction } from "@/slices/productSlice";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { clearInterval } from "timers";
import ProductCard from "@/Components/Product/ProductCard";
import style from "../../Components/Product/Product.module.scss";
import { Skeleton } from "@mui/material";

function index() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.Product);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/product");
      setProgress(100);
      dispatch(productSliceAction.fetchProduct(data));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);
    fetchData();
    // return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log("fetched from redux toolkit", products[0]);
  }, [products]);
  return (
    <>
      {/* {loading ? (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ color: "purple" }}
          />
        </Box>
      ) : (
        <div className={style.productContainer}>
          {products.map((product) =>
            loading ? (
              <>
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  width={210}
                  height={118}
                />
              </>
            ) : (
              <ProductCard product={product}></ProductCard>
            )
          )}
        </div>
      )} */}

      <div className={style.productContainer}>
        {products.map((product) =>
          loading ? (
            <Skeleton
              sx={{ bgcolor: "grey.1000", borderRadius: "10px" }}
              variant="rectangular"
              width={300}
              height={400}
            />
          ) : (
            <ProductCard product={product}></ProductCard>
          )
        )}
      </div>
    </>
  );
}
export default index;
