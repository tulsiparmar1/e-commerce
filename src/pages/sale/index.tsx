import ProductCard from "@/Components/Product/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

function index() {
  const [onSaleProduct, setOnSaleProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/onsale");
        setOnSaleProduct(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchSaleProducts();
  }, []);
  return (
    <div style={{ display: "flex", gap: "16px", margin: "20px" }}>
      {onSaleProduct.map((item) =>
        loading ? (
          <Skeleton
            sx={{ bgcolor: "grey.1000", borderRadius: "10px" }}
            variant="rectangular"
            width={300}
            height={400}
          />
        ) : (
          <ProductCard product={item}></ProductCard>
        )
      )}
    </div>
  );
}

export default index;
