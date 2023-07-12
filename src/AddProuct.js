import React, { useState, useEffect } from "react";
import Header from "./Header";
import { db } from "./firebase";
import useCart from "./hooks/useCart";
import Z from "./Z";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProuct = () => {
  const { user } = useCart();
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    db.collection("restaurants")
      .doc(user.uid)
      .collection("food")
      .onSnapshot((snapshot) =>
        setData(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  const productDelete = (id) => {
    db.collection("restaurants")
      .doc(user.uid)
      .collection("food")
      .doc(id)
      .delete();
    toast.error("Product Delete", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    });
  };

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

          {data
            .filter(
              (doc) =>
                doc.data.name?.toLowerCase().indexOf(search.toLowerCase()) !==
                -1
            )
            .map((doc, i) => (
              <tr key={doc.id}>
                <td>{i + 1}</td>
                <td>{doc.id}</td>
                <td>{doc.data.name} </td>
                <td>{doc.data.price}</td>
                <td>
                  <Update product={doc} />
                </td>
                <td onClick={() => productDelete(doc.id)}>X</td>
              </tr>
            ))}
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProuct;
