import React ,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { db } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCart from "./hooks/useCart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p:8,
};

export default function BasicModal({product}) {
    console.log(product);
  const  {user} = useCart()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(product.data.name)
  const [price, setPrice] = useState(product.data.price)
  

  const updateProduct =()=>{
    db.collection("restaurants").doc(user.uid).collection("food").doc(product.id).update({
        name:name,
        price:price
    })
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
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <div style={{ textAlign:'center',width:'250px'}}>
           <h2 style={{textAlign:'center'}}>Add Product</h2><br/>
            <div>
              <input value={name} placeholder="Product Name " onChange={(e)=>setName(e.target.value)} />
            </div>
            <br />
            <div>
              <input value={price} placeholder="Price Name " onChange={(e)=>setPrice(e.target.value)}/>
            </div><br/>
            <div>
            <button class="button-62" role="button" onClick={updateProduct}>Update Product</button><p></p>
            <button class="button-62" role="button" onClick={handleClose}>cancel</button>
           </div>
           </div>
          </Typography>
          <ToastContainer/>
        </Box>
      </Modal>
    </div>
  );
}
