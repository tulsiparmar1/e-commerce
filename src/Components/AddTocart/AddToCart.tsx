import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Button, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { Modal } from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";

function AddToCart({ product, setCarts }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [count, setCount] = React.useState(1);
  useEffect(() => {
    console.log("product", product.productId._id);
  }, [product]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleRemove = async () => {
    console.log("handleRemove is called");
    try {
      const { data } = await axios.delete("/api/cart/cartitems", {
        data: { productId: product._id },
      });
      console.log("data", data.carts[0]);
      setCarts(data.carts[0]);
    } catch (error) {
      console.log("error", error);
    }
    setOpen(false);
  };

  return (
    <Card
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
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
            Qty:{product.quantity}
            <Tooltip title="delete">
              <DeleteIcon onClick={handleClickOpen} />
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to remove this product from cart?
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleClose}>cancle</Button>
                <Button onClick={handleRemove}>remove</Button>
              </DialogActions>
            </Dialog>
            {/* --------------------Edit cart item button----------------------------- */}
            <Tooltip title="edit">
              <ModeEditOutlineIcon onClick={handleOpen2} />
            </Tooltip>
          </div>
          <Modal open={open2} onClose={handleClose2}>
            <Box
              sx={{
                background: "white",
                position: "fixed",
                height: "100vh",
                width: "200px",
                right: "0px",
                padding: "20px",
              }}
            >
              <h2>Edit</h2>
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
              <CardMedia
                component="img"
                sx={{ width: 151, objectFit: "cover", maxHeight: "200px" }}
                image={product.productId.images[0].url}
                alt={product.productId.images[0].alt}
              />
              <Box>
                <button
                  // onClick={handleCountDecrement}
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
                  // onClick={handleCountIncrement}
                  style={{ border: "1px solid gray", width: "40px" }}
                >
                  +
                </button>
              </Box>
              <Button variant="outlined" onClick={handleClose2}>
                Close
              </Button>
            </Box>
          </Modal>
        </CardContent>
      </Box>
      <Box>
        <CardMedia
          component="img"
          sx={{ width: 151, objectFit: "cover", maxHeight: "200px" }}
          image={product.productId.images[0].url}
          alt={product.productId.images[0].alt}
        />
      </Box>
    </Card>
  );
}

export default AddToCart;
