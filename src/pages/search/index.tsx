import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function search() {
  const router = useRouter();
  const { q } = router?.query; //extract the query
  console.log("1q", q); //this contain your searh result for example "summer kurti"
  useEffect(() => {
    const searchResult = async () => {
      try {
        const { data } = await axios.get(
          `/api/search?q=${encodeURIComponent(q as string)}` //again this convert into url encoded query
          // this will trigger backend api
        );
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    searchResult();
  }, [q]);
  return <div>search page</div>;
}

export default search;
