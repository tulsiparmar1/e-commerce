import React, { useEffect } from "react";
import { Product } from "@/slices/productSlice";
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
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";

function AddToCart({ product, setCarts }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    console.log("product", product.productId._id);
  }, [product]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            {/* <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                Do you want to remove this product from cart?
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleClose}>cancle</Button>
                <Button onClick={handleRemove}>removee</Button>
              </DialogActions>
            </Dialog> */}
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
            <Tooltip title="edit">
              <ModeEditOutlineIcon />
            </Tooltip>
          </div>
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
