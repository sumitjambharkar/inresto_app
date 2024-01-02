import Search from "./Search";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import useCart from "./hooks/useCart";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dish = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const uid = location.state;
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3002/show-all-product"
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getOrder = async () => {
    try {
      const result = await axios.get("http://localhost:3002/single-table", {
        params: { id: uid?.id },
      });
      setOrder(result.data.basket);
      setTable(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [uid.id]);

  const addOrder = async (doc) => {
    try {
      const result = await axios.post("http://localhost:3002/add-order", {
        id: uid.id,
        name: doc.name,
        price: doc.price,
        qty: 1,
      });
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const result = await axios.post(
        "http://localhost:3002/basket-order-remove",
        {
          id: uid.id,
          orderId: orderId,
        }
      );
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async (check) => {
    console.log(check);
    try {
      const result = await axios.post(
        "http://localhost:3002/basket-order-increment-decrement",
        {
          id: uid.id,
          orderId: check.id,
          action: check.action,
        }
      );
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const payment = (id) => {
    navigate("/payment",{state:{id:id,total:table.totalAmount}})
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="all_tables col-lg-8 col-md-8 col-sm-12 mt-2">
            <Search />
            <div className="row">
              {data
              .filter((doc)=>doc.isOnline===true)
              .map
              
              ((doc) => ( 
                <div  onClick={() => addOrder(doc)} key={doc._id} className="table col-3">
                  <div className="product_box">
                    <button
                      style={{ outline: "none" }}
                      className="add_product_back"
                    >
                      {doc.name}
                    </button>
                    <button
                      style={{ outline: "none" }}
                      className="add_product_back"
                    >
                      Rs. {doc.price}
                    </button>
                    <button
                      style={{ outline: "none" }}
                      className="add_product"
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="single_bill col-lg-4 col-md-4 col-sm-12">
            <div class="container_bill">
              <div class="bill">
                <div class="order-details">
                  <h2>Table {table.table}</h2>
                  <table>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    {order.map((doc, i) => (
                      <tr key={doc.name}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <IconButton
                              style={{ fontSize: 16, outline: "none" }}
                            >
                              {doc.name}
                            </IconButton>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => deleteOrder(doc._id)}
                                style={{
                                  fontSize: 16,
                                  outline: "none",
                                  fontWeight: "bolder",
                                  color: "black",
                                }}
                              >
                                <ClearIcon fontSize="12" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>{doc.price}</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <Tooltip title="Add">
                            <IconButton
                              style={{
                                fontSize: 16,
                                outline: "none",
                                fontWeight: "bolder",
                                color: "black",
                              }}
                              onClick={() =>
                                increment({ id: doc._id, action: "increment" })
                              }
                            >
                              <AddIcon fontSize="12" />
                            </IconButton>
                          </Tooltip>
                          {doc.qty}{" "}
                          <Tooltip title="Less">
                            <IconButton
                              onClick={() =>
                                increment({ id: doc._id, action: "decrement" })
                              }
                              style={{
                                fontSize: 16,
                                outline: "none",
                                fontWeight: "bolder",
                                color: "black",
                              }}
                            >
                              <RemoveSharpIcon fontSize="12" />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td style={{ textAlign: "center" }}>{doc.total}</td>
                      </tr>
                    ))}
                    {/* {order.length === 0 ? (
                  <></>
                ) : (
                  <>
                    {userData.service ? (
                      <>
                        <tr>
                          <th></th>
                          <th>Service Char</th>
                          <th>
                            <input
                              value={`${userData.servicen}%`}
                              className="in"
                            />
                          </th>
                          <th></th>
                          <th>
                            <span>{getService}</span>
                          </th>
                        </tr>
                      </>
                    ) : null}
                    {userData.gst ? (
                      <>
                        <tr>
                          <th></th>
                          <th>GST Tax</th>
                          <th>
                            <input value={`${userData.gstn}%`} className="in" />
                          </th>
                          <th></th>
                          <th>
                            <span>{getGst}</span>
                          </th>
                        </tr>
                      </>
                    ) : null}
                  </>
                )}

                {disc ? (
                  <tr>
                    <th></th>
                    <th>Discount</th>
                    <th>
                      <input
                        name="name"
                        type="text"
                        className="in"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </th>
                    <th></th>
                    <th>
                      <span>{discountTotal}</span>
                    </th>
                  </tr>
                ) : null} */}

                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                      <th>Rs.{table.totalAmount}</th>
                    </tr>
                    <tr>
                      <th style={{ cursor: "pointer" }}>Print</th>
                      <th onClick={()=>payment(uid.id)} style={{ cursor: "pointer" }}>Payment</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Dish;
