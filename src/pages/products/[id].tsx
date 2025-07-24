// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";

// function UpdateProduct() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ name: "", price: "" });
//   const { id } = router.query;
//   console.log("Product ID:", id);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const updateProduct = async () => {
//     try {
//       await axios.put("/api/products/" + id, {
//         name: formData.name,
//         price: formData.price,
//       });
//       router.push("/");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get("/api/products/" + id);
//       setFormData({ name: res.data.name, price: res.data.price });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     console.log("formData", formData);
//   }, [formData]);

//   return (
//     <div>
//       <label htmlFor="">Name:</label>{" "}
//       <input
//         type="text"
//         name="name"
//         onChange={(e) => handleChange(e)}
//         value={formData?.name}
//       />
//       <label htmlFor="">Price:</label>{" "}
//       <input
//         type="number"
//         name="price"
//         onChange={(e) => handleChange(e)}
//         value={formData?.price}
//       />
//       <button onClick={updateProduct}>Update product</button>
//     </div>
//   );
// }

// export default UpdateProduct;
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setSelectedProduct(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    console.log("selected Producr", selectedProduct);
  }, [selectedProduct]);
  return (
    <div>
      {/* <div>
        <h1>{selectedProduct.name}</h1>
      </div> */}
    </div>
  );
}

export default ProductPage;
