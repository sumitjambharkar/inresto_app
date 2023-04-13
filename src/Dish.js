import Search from './Search';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from './firebase';
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import useCart from './hooks/useCart';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dish = () => {

  const { input } = useCart()
  const { id } = useParams()
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState('')
  const navigate = useNavigate()

  const arr = [{ id: "1", name: "vada", price: 20 }, { id: "2", name: "Chai", price: 202 }, { id: "3", name: "Pizza", price: 120 }, { id: "4", name: "Drink", price: 20 }, { id: "5", name: "Momos", price: 20 }, { id: "6", name: "Chicken", price: 50 }, { id: "17", name: "Sugar", price: 15 }, { id: "8", name: "Burger", price: 30 }, { id: "9", name: "Dal", price: 15 }, { id: "10", name: "Cake", price: 10 },]
  useEffect(() => {
    const rest = async () => {
      const x = await order.reduce((acc, current) => acc + current.qty * current.price, 0);
      setTotal(x)
    }
    return () => rest()
  },)



  useEffect(() => {
    db.collection(`${id}`).onSnapshot(snapshot => (
      setOrder(snapshot.docs.map((doc) => doc.data()))
    ))
  }, [id])

  // useEffect(() => {
  //   const result = order.reduce((finalArr, current) => {
  //     let obj = finalArr.find((item) => item.id === current.id);
  //     if (obj) {
  //       return finalArr;
  //     } else {
  //       const resu = order.filter((item) => item.name === current.name)
  //       return finalArr.concat([{ id: current.id, name: current.name, qty: resu.length, price: current.price, total: current.price * resu.length }])
  //     }
  //   }, [])
  //   setProduct(result);
  // }, [])

  //  useEffect(() => {
  //    db.collection(`${id}`).onSnapshot((snapshot=>(
  //     setOld(snapshot.docs.map((doc)=>doc.data()))
  //    )))
  //  }, [])

  const addProduct = (item) => {
    db.collection(`${id}`).doc(`${item.id}`).set({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      isOnline: true

    })
    toast.success(`Add ${item.name}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    });
    const same = order.filter((ele) => (ele.id === item.id))
    if (same) {
      db.collection(`${id}`).doc(`${item.id}`).set({
        id: same[0].id,
        name: same[0].name,
        price: same[0].price,
        qty: same[0].qty + 1,
        isOnline: true
      })

    }
  }



  const deleteItem = (doc) => {
    db.collection(`${id}`).doc(doc.id).delete()
    toast.error(`Delete ${doc.name}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    });

  }

  const increment = (item) => {
    const same = order.filter((ele) => (ele.id === item.id))
    if (same) {
      db.collection(`${id}`).doc(`${item.id}`).set({
        id: same[0].id,
        name: same[0].name,
        price: same[0].price,
        qty: same[0].qty + 1,
        isOnline: true
      })
      toast.success(`Add ${item.name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }
  }

  const decrement = (item) => {
    const same = order.filter((ele) => (ele.id === item.id))
    if (same && same[0].qty > 1) {
      db.collection(`${id}`).doc(`${item.id}`).set({
        id: same[0].id,
        name: same[0].name,
        price: same[0].price,
        qty: same[0].qty - 1,
        isOnline: true
      })
      toast.success(`Less ${item.name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    } else {
      db.collection(`${id}`).doc(item.id).delete()
    }
  }
  const print = () => {

  }
  const bill = () => {
    navigate(`/payment/${id}`)
  }

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div className='all_tables col-lg-8 col-md-8 col-sm-12 mt-2'>
            <Search />
            <div className='row'>
              {arr
                .filter(
                  (ele) =>
                    ele.name
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) !== -1
                )
                .map((doc) => (
                  <div key={doc.id} className='table col-3'><div className='product_box'>
                    <button className='add_product_back'>{doc.name}</button>
                    <button className='add_product_back'>Rs. {doc.price}</button>
                    <button onClick={() => addProduct(doc)} className='add_product'>Add Cart</button>
                  </div></div>
                ))}
            </div>
          </div>
          <div className='single_bill col-lg-4 col-md-4 col-sm-12'>
            <div className='bill'>
              <table style={{ width: "100%" }}>
                <th>Table No {id.slice(5)}</th>

              </table>
              <table style={{ width: "100%" }}>
                <tr>
                  <th>SR.No</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
                {order
                  .map((doc, i) => (
                    <tr key={doc.name}>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td ><div style={{ display: "flex", justifyContent: "space-between" }}><IconButton style={{ fontSize: 16, outline: "none" }}>{doc.name}</IconButton><Tooltip title="Delete"><IconButton style={{ fontSize: 16, outline: "none", fontWeight: "bolder", color: "black" }} onClick={() => deleteItem(doc)}><ClearIcon fontSize='12' /></IconButton></Tooltip></div></td>
                      <td style={{ textAlign: "center" }}>{doc.price}</td>
                      <td style={{ textAlign: "center" }}> <Tooltip title="Add"><IconButton style={{ fontSize: 16, outline: "none", fontWeight: "bolder", color: "black" }} onClick={() => increment(doc)}>
                        <AddIcon fontSize='12' />
                      </IconButton ></Tooltip>{doc.qty} <Tooltip title="Less"><IconButton style={{ fontSize: 16, outline: "none", fontWeight: "bolder", color: "black" }} onClick={() => decrement(doc)}>
                        <RemoveSharpIcon fontSize='12' />
                      </IconButton></Tooltip></td>
                      <td style={{ textAlign: "center" }}>{doc.qty * doc.price}</td>
                    </tr>
                  ))}
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>{total}</th>
                </tr>
                <tr>
                  <th style={{cursor:"pointer"}} onClick={print}>Print</th>
                  <th style={{cursor:"pointer"}} onClick={bill}>Payment</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Dish;