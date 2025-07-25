import ProductCard from "@/Components/Product/ProductCard";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

function search() {
  const router = useRouter();
  const [matchedItems, setMatchedItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const { q } = router?.query; //extract the query
  console.log("1q", q); //this contain your searh result for example "summer kurti"
  useEffect(() => {
    const searchResult = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/search?q=${encodeURIComponent(q as string)}` //again this convert into url encoded query
          // this will trigger backend api
        );
        setMatchedItems(data);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    searchResult();
  }, [q]);
  return (
    <div>
      <div style={{ display: "flex", gap: "16px", margin: "20px" }}>
        {matchedItems.map((item) =>
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
    </div>
  );
}

export default search;
