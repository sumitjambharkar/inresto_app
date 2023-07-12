import React, { useState,useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from './Header';
import { db } from './firebase';
import { useNavigate,  useParams } from 'react-router-dom';
import useCart from './hooks/useCart';

const BillingScreen = () => {
  
  const {id} = useParams()
  const {user} = useCart()
  const  navigate= useNavigate()
  const [data,setData] = useState([])
  const [total,setTotal] = useState('')
  const [takeAmount,setTakeAmount] = useState('')
  const [retAmount,setRetAmount] = useState('')
  const [show,setShow] = useState(false)
  const [order,setOrder] = useState('')

  useEffect(() => {
    db.collection("restaurants").doc(user.uid).collection(`${id}`).onSnapshot(snapshot=>(
      setData(snapshot.docs.map((doc)=>doc.data()))
    ))
  }, [])
  
  useEffect(() => {
    const rest = async()=>{
      const x = await data.reduce((acc, current) => acc + current.qty * current.price,0);
      setTotal(x)
      const y = await total-takeAmount
      setRetAmount(y)
    }
    return()=> rest()
  },) 
  
  const cash = () => {
    db.collection("restaurants").doc(user.uid).collection("bill").add({
      table:id,
      time:new Date(),
      bill:data,
      payment:"cash",
      takeAmount:takeAmount,
      retAmount:retAmount,
      total:total
      
    })
    data.map((ele)=>db.collection("restaurants").doc(user.uid).collection(`${id}`).doc(ele.id).delete())
    navigate("/")
  }

  const card = () => {
    db.collection("restaurants").doc(user.uid).collection("bill").add({
      table:id,
      time:new Date(),
      bill:data,
      payment:"card",
      takeAmount:takeAmount,
      retAmount:retAmount,
      total:total
      
    })
    data.map((ele)=>db.collection("restaurants").doc(user.uid).collection(`${id}`).doc(ele.id).delete())
    navigate("/")

  }

  const upi = () => {
    db.collection("restaurants").doc(user.uid).collection("bill").add({
      table:id,
      time:new Date(),
      bill:data,
      payment:"upi",
      takeAmount:takeAmount,
      retAmount:retAmount,
      total:total
      
    })
    data.map((ele)=>db.collection("restaurants").doc(user.uid).collection(`${id}`).doc(ele.id).delete())
    navigate("/")
  }
  const other =()=>{
    db.collection("restaurants").doc(user.uid).collection("bill").add({
      table:id,
      time:new Date(),
      bill:data,
      payment:order,
      takeAmount:takeAmount,
      retAmount:retAmount,
      total:total
      
    })
    data.map((ele)=>db.collection("restaurants").doc(user.uid).collection(`${id}`).doc(ele.id).delete())
    navigate("/")
  }
  
  return (
    <>
    <Header/>
    <Tabs>
    <TabList>
      <Tab>Cash</Tab>
      <Tab>Card</Tab>
      <Tab>UPI</Tab>
      <Tab>OTHERS</Tab>
    </TabList>
    <div className='tabbox'>
    <TabPanel >
   <div className='billbox'>
   <div className='h1div'>        
      <h2 className='h2payment'>CASH PAYMENT</h2><div className='paymentlogo'><img className='paymentimage' src='https://img.icons8.com/ios/256/cash-in-hand.png'/></div>
      </div>
     <div>
    {!show?<div className='total'><li><h6>You Want add Tip</h6></li><li><button onClick={()=>setShow(true)}>Yes</button></li></div>:
     <div className='total'><li><h6>cancel Tip</h6></li><li><button onClick={()=>setShow(false)}>No</button></li></div>}
    <div className='total'> <li><h6>TOTAL AMOUNT</h6></li><li><input value={total}/></li></div>
    {show? <div  className='total'><li><h6>TIPS AMOUNT</h6></li><li><input/></li></div>:null}
      <div className='total'><li><h6>PICKUP AMOUNT</h6></li><li><input value={takeAmount} onChange={(e)=>setTakeAmount(e.target.value)}/></li></div>
      <div className='total'><li><h6>RETURN AMOUNT</h6></li><li><input value={retAmount}  /></li></div>
     <div className='buttondiv'> <button class="button-62" role="button" onClick={cash} style={{margin:12,padding:8}} >Payment</button></div>
    </div>
   </div>
    </TabPanel>
    </div>
    <div className='tabbox'>
    <TabPanel>
    <div className='billbox'>
    <div className='h1div'>        
      <h2 className='h2payment'>CARD PAYMENT</h2><div className='paymentlogo'><img className='paymentimage' src='https://img.icons8.com/dotty/256/card-in-use.png'/></div>
      </div>    <div className='total'> <li><h6>TOTAL AMOUNT</h6></li><li><input value={total}/></li></div>
     <div className='buttondiv'> <button class="button-62" role="button" onClick={card} style={{margin:12,padding:8}} >Payment</button></div>
    </div>
    </TabPanel>
    </div>
   
    <div className='tabbox'>
    <TabPanel>
<div className='billbox'>
  <div className='h1div'>        
  <h2 className='h2payment'>UPI PAYMENT</h2><div className='paymentlogo'><div className='paymentimage'><img className='paymentimage' src='https://img.icons8.com/ios-filled/256/bhim-upi.png'/></div></div>
  </div>
<div className='total'> <li><h6>TOTAL AMOUNT</h6></li><li><input value={total}/></li></div>
 <div className='buttondiv' > <button class="button-62" role="button" onClick={upi} style={{margin:12,padding:8}} >Payment</button></div>
</div>
</TabPanel>
    </div>
    <div className='tabbox'>
    <TabPanel>
<div className='billbox'>
  <div className='h1div'>        
  <h2 className='h2payment'>OTHERS PAYMENT</h2><div className='paymentlogo'><div className='paymentimage'><img className='paymentimage' src='https://img.icons8.com/windows/256/connection-status-off.png'/></div></div>
  </div>
<div className='total'> <input value='zomato' type='checkbox' onChange={(e)=>setOrder(e.target.value)}/><li><h6>ZOMATO AMOUNT</h6></li><li><input value={total}/></li></div>
 <div className='total'><input value='swiggy' type='checkbox' onChange={(e)=>setOrder(e.target.value)}/><li><h6>SWIGY AMOUNT</h6></li><li><input value={total}/></li></div>
 <div className='total'><input value='delivery' type='checkbox' onChange={(e)=>setOrder(e.target.value)}/> <li><h6>DELEVERY AMOUNT</h6></li><li><input value={total}/></li></div>
 <div className='total'><input value='other' type='checkbox'onChange={(e)=>setOrder(e.target.value)} /><li><h6>OTHERS AMOUNT</h6></li><li><input value={total}/></li></div>
 <div className='buttondiv' > <button class="button-62" role="button" onClick={other} style={{margin:12,padding:8}} >Payment</button></div>

</div>
</TabPanel>
    </div>
  </Tabs>
    </>
  )
}

export default BillingScreen