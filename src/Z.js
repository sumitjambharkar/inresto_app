import React ,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCart from "./hooks/useAuth";
import axios from "axios";
import { TextField } from "@mui/material";
import config from "./config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p:8,
};

export default function BasicModal() {
  const  {user} = useCart()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  

  const addproduct =async()=>{
    try {
      const result = await axios.post(`${config}/create-product`,{name,price,isOnline:true})
      console.log(result.data.message);
      toast.success("Add Product", {
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
    window.location.reload()
    } catch (error) {
      
    }
  }

  return (
    <div>
      <Button style={{background:'#243763',color:'white'}} onClick={handleOpen}>Add Product</Button>
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
            </div><br/>
            <div>
            <Button variant="contained"
                  color="success" 
                  onClick={addproduct}>Add Product</Button><p></p>
            <Button variant="contained"
                  color="error"  onClick={handleClose}>cancel</Button>
           </div>
           </div>
          </Typography>
          <ToastContainer/>
        </Box>
      </Modal>
    </div>
  );
}
