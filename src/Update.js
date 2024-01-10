import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCart from "./hooks/useAuth";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import config from "./config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 8,
};

export default function BasicModal({ doc }) {
  const { user } = useCart();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(doc.name);
  const [price, setPrice] = useState(doc.price);
  const [checked, setChecked] = useState(doc.isOnline);


  const updateProduct = async () => {
    try {
      const result = await axios.put(
        `${config}/update-single-product`,
        { id: doc._id, name: name, price: price,isOnline:checked }
      );
      toast.success("Update Product", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      <IconButton onClick={handleOpen}><EditIcon style={{color:"black"}}/></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{ textAlign: "center", width: "250px" }}>
              <h2 style={{ textAlign: "center" }}>Add Product</h2>
              <br />
              <div>
                <Switch
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <br />
              <div>
                <TextField
                  value={name}
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <TextField
                  value={price}
                  label="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <br />
              <div>
                <Button
                  variant="contained"
                  onClick={updateProduct}
                  color="success"
                >
                  Update
                </Button>
                <p></p>
                <Button variant="contained" color="error" onClick={handleClose}>
                  cancel
                </Button>
              </div>
            </div>
          </Typography>
          <ToastContainer />
        </Box>
      </Modal>
    </div>
  );
}
