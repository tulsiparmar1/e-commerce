import React, { useEffect, useState } from "react";
import { Product } from "@/slices/productSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import style from "../../Components/Product/Product.module.scss";

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [addToCart, setAddToCart] = useState(false);
  useEffect(() => {
    console.log("product received from parent component", product);
  });

  const truncate = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };
  return (
    // <Card sx={{ maxWidth: 345, minWidth: 250, display: "flex" }}>
    //   <CardActionArea sx={{ padding: "20px" }}>
    //     <CardMedia
    //       component="img"
    //       height="200"
    //       // image={product.images[0].url} //url from backend //
    //       image={`/shopping2.jpg`}
    //       alt={product.images[0].alt}
    //     />
    //     <CardContent>
    //       <Stack sx={{ display: "flex" }}>
    //         <Typography
    //           gutterBottom
    //           variant="h6"
    //           component="div"
    //           style={{ fontSize: "16px" }}
    //         >
    //           {product.name} -
    //           <span
    //             style={{
    //               color: "purple",
    //               fontWeight: "bold",
    //               fontSize: "16px",
    //             }}
    //           >
    //             {product.price}rs
    //           </span>
    //         </Typography>
    //       </Stack>
    //       <Stack>Stock:{product.stock}</Stack>
    //       <Stack> {product.description}</Stack>
    //     </CardContent>

    //     {/* <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         flexDirection: "column",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           gap: "20px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <p style={{ fontSize: "15px" }}>{product.name}</p>
    //         <p
    //           style={{
    //             fontWeight: "bold",
    //             color: "purple",
    //             fontSize: "16px",
    //           }}
    //         >
    //           {product.price}rs.
    //         </p>
    //       </div>
    //       <div>
    //         {" "}
    //         <p style={{ color: "gray" }}>Stock:{product.stock}</p>
    //       </div>
    //     </div>
    //     <div className={style.addToCart}>
    //       {" "}
    //       <button onClick={() => console.log("clicked")}>Add to cart</button>
    //     </div> */}
    //   </CardActionArea>
    // </Card>
    <Card
      sx={{
        // maxWidth: 305,
        // minWidth: 200,
        width: 300,
        height: 400,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.01)",
          cursor: "default",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ padding: 2, position: "relative" }}>
        {addToCart ? (
          <FcLike
            onClick={() => setAddToCart(false)}
            style={{
              fontSize: "25px",
              padding: "2px",
              borderRadius: "10px",
              position: "absolute",
              right: 20,
              color: "purple",
              top: 20,
              backgroundColor: "white",
            }}
          />
        ) : (
          <CiHeart
            onClick={() => setAddToCart(true)}
            style={{
              fontSize: "25px",
              padding: "2px",
              borderRadius: "10px",
              position: "absolute",
              right: 20,
              top: 20,
              backgroundColor: "white",
            }}
          />
        )}
        {product.isOnSale && (
          <img
            src="/save.gif"
            alt="sale img"
            style={{ height: "50px", position: "absolute" }}
          />
        )}

        <CardMedia
          component="img"
          height="200"
          image={`${product.images[0].url}`}
          alt={product.images[0].alt}
          sx={{
            borderRadius: 2,
            objectFit: "cover",
          }}
          onClick={() => router.push(`products/${product._id}`)}
        />

        <CardContent sx={{ paddingX: 0 }}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "text.primary",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {product.name}
              <Typography
                component="span"
                sx={{ color: "purple", fontWeight: "bold", fontSize: "16px" }}
              >
                ₹{product.price}
              </Typography>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {truncate(product.description, 20)}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: product.stock > 0 ? "purple" : "red",
                fontWeight: 500,
              }}
            >
              Stock: {product.stock}
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "purple" }}
              // onClick={() => router.push(`/products/${product._id}`)}
              onClick={() => router.push("/cart")}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}

export default ProductCard;
