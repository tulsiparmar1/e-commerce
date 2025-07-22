import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>("/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handlePostProductData = async () => {
    try {
      const response = await axios.post<Product>("/api/product", {
        name: formData.name,
        price: formData.price,
      });
      console.log("response", response);
      setProducts((prev) => [...prev, response.data]);
      setFormData({ name: "", price: "" });
    } catch (error) {
      console.log("Error posting product data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = (id) => {
    router.push(`/products/${id}`);
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete("/api/products/" + id);
      console.log("res", res);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {products.map((p) => (
        <div key={p.name} className="border-b py-2">
          <p>
            {p.name} – ₹{p.price}{" "}
            <button onClick={() => handleUpdate(p._id)}>update</button>
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </p>
        </div>
      ))}
      <div>
        <label htmlFor="">
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" name="" /> */}
          Name:
          <input
            type="text"
            name="name"
            placeholder="enter product name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          price:
          <input
            type="number"
            name="price"
            placeholder="enter product's Price"
            onChange={handleChange}
          />
        </label>
        <button onClick={handlePostProductData}>Add New Product</button>
      </div>
    </main>
  );
}
