import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "./Tab";
import Header from "./Header";
import useCart from "./hooks/useCart";
import axios from "axios";

const Home = () => {
  const [table, setTable] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:3002/show-table");
      setTable(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const singlePage = (id) => {
      navigate("/dish",{state:{id}})
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
            <Tab />
            <div className="row">
              {table.map((doc) => (
                <div style={{ cursor: "pointer" }} onClick={()=>singlePage(doc._id)} key={doc._id} className="table col-3">
                  <div className="table_box">
                    <div className={doc.isOnline?"book":"hide"}><h5> {doc.totalAmount===0?null:`Running Rs.${doc.totalAmount}`}</h5></div>
                    <div className="add_table">
                      <span>Table {doc.table}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>     
      </div>
    </>
  );
};

export default Home;
