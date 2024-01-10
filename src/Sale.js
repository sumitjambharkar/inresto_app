import React, { useState, useEffect } from "react";
import Header from "./Header";
import useCart from "./hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import config from "./config";

const Sale = () => {
  const { user } = useCart();
  const [sale, setSale] = useState([]);

  const getData = async () => {
    try {
      const result = await axios.get(`${config}/sale-report`);
      setSale(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const paymentMode = (mode) => {
    let pay = sale.filter((doc) => doc.paymentMethod === mode);
    return pay.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  let mainTotal =
    paymentMode("Cash") +
    paymentMode("Card") +
    paymentMode("UPI") +
    paymentMode("Others");

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681201802/New_Project_7_jiaulw.png"
            />
          </div>
          <h6>Bill</h6>
          <p>{sale.length}</p>
        </div>
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192004/New_Project_3_afuhlk.png"
            />
          </div>
          <h6>Cash</h6>
          <p>{paymentMode("Cash")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192175/New_Project_4_jmxkil.png"
            />
          </div>
          <h6>Card</h6>
          <p>{paymentMode("Card")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192328/New_Project_5_cw22p7.png"
            />
          </div>
          <h6>UPI</h6>
          <p>{paymentMode("UPI")}</p>
        </div>
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681205248/New_Project_8_blkx43.png"
            />
          </div>
          <h6>OTHERS</h6>
          <p>{paymentMode("Others")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192288/New_Project_6_n3dwrf.png"
            />
          </div>
          <h6>Total</h6>
          <p>{mainTotal}</p>
        </div>
      </div>
      <div className="rowbox">
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Cashier Name</th>
            <th>Table No</th>
            <th>Time</th>
            <th>Pay Mode</th>
            <th>Amount</th>
            <th>Bill</th>
          </tr>

          {sale.map((ele, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>sumit</td>
              <td>Table {ele.table}</td>
              <td>{moment(ele.createdAt).format("lll")}</td>
              <td>{ele.paymentMethod}</td>
              <td>{ele.totalAmount}</td>
              <td>View</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Sale;
