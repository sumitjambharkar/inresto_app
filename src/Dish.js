import Search from './Search';
import React, { useState, useEffect } from 'react';
import useCart from './hooks/useCart';
import { useParams } from 'react-router-dom'
import { db } from './firebase';
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import IconButton from '@mui/material/IconButton';

const Dish = () => {

  const { id } = useParams()
  const [order, setOrder] = useState([])
  console.log(order);
  const arr = [{ id: "1", name: "vada", price: "20" }, { id: "2", name: "vadfa", price: "202" }, { id: "3", name: "vadafdg", price: "120" }, { id: "4", name: "vada", price: "20" }, { id: "5", name: "vada", price: "20" }, { id: "6", name: "vada", price: "20" }, { id: "17", name: "vada", price: "20" }, { id: "8", name: "vada", price: "20" }, { id: "9", name: "vada", price: "20" }, { id: "10", name: "vada", price: "20" },]
  const { table, dispatch } = useCart()
  console.log(table)
  useEffect(() => {
    db.collection(`${id}`).onSnapshot(snapshot => (
      setOrder(snapshot.docs.map((doc) => doc.data()))
    ))
  }, [id])

  

  const addProduct = (item) => {
    dispatch({ type: "ADD", payload: item })
    db.collection(`${id}`).add({
      id:item.id,
      name:item.name,
      price:item.price,
      qty:1,
      
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='all_tables col-lg-8 col-md-8 col-sm-12 mt-2'>
          <Search />
          <div className='row'>
            {arr.map((doc) => (
              <div className='table col-3'><div className='product_box'>
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
                  <tr key={i}>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td>{doc.name}</td>
                    <td style={{ textAlign: "center" }}>{doc.price}</td>
                    <td style={{ textAlign: "center" }}><IconButton>
                      <AddIcon />
                    </IconButton>2 <IconButton>
                        <RemoveSharpIcon />
                      </IconButton></td>
                    <td style={{ textAlign: "center" }}>20</td>
                  </tr>
                ))}
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dish;