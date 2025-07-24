import React from "react";
import { useRouter } from "next/router";

function Category() {
  const router = useRouter();
  const { categories } = router.query;
  console.log("categories", categories);
  return <div>categor {categories}</div>;
}

export default Category;
