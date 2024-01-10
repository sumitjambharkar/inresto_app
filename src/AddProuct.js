import React, { useState, useEffect } from "react";
import Header from "./Header";
import useCart from "./hooks/useAuth";
import Z from "./Z";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import config from "./config";

const AddProuct = () => {
  const { user } = useCart();
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData =async () => {
    try {
      const result = await axios.get(`${config}/show-all-product`)
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const productDelete = async(id) => {
   try {
    const result = await axios.delete(`${config}/delete-single-product`,{params:{id}})
    console.log(result);
   } catch (error) {
    console.log(error);
   }
  }


  return (
    <>
      <Header /> 
      <div style={{display:"flex" ,justifyContent:'end',margin:'2%'}} className="container">
        <Z />
        <input style={{width:'50%',marginLeft:'30px'}}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="rowbox">
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>

          
              {data.map((doc,i)=>(
                <tr >
                <td>{i+1}</td>
                <td>{doc._id}</td>
                <td>{doc.name}</td>
                <td>Rs.{doc.price}</td>
                <td>
                  <Update doc={doc} />
                </td>
                <td style={{cursor:"pointer"}}><IconButton onClick={()=>productDelete(doc._id)}><CloseIcon style={{color:"black"}}/></IconButton></td>
              </tr>
              ))}
      
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProuct;
