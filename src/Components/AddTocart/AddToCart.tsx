import React, { useEffect } from "react";
import { Product } from "@/slices/productSlice";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

function AddToCart({ product }: { product: Product }) {
  useEffect(() => {
    console.log("product", product);
  }, [product]);
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product?.productId.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {product.productId.category}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Color:{product.color}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Size:{product.size}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              <button
                //   onClick={handleCountDecrement}
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
                {product.quantity}
              </span>
              <button
                //   onClick={handleCountIncrement}
                style={{ border: "1px solid gray", width: "40px" }}
              >
                +
              </button>
            </div>
            <DeleteIcon />
          </div>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={product.productId.images[0].url}
        alt={product.productId.images[0].alt}
      />
    </Card>
  );
}

export default AddToCart;
