import React, { useState, useEffect } from 'react'
import Header from './Header'
import { db } from './firebase'

const Sale = () => {
    const [data, setData] = useState([])
    const [cash, setCash] = useState("")
    const [card, setCard] = useState("")
    const [upi, setUpi] = useState("")
    const [other, setOther] = useState("")


    const [total, setTotal] = useState('')

    useEffect(() => {
        db.collection('bill').orderBy("time", "desc").onSnapshot(snapshot => (
            setData(snapshot.docs.map((doc) => doc.data()))
        ))
    }, [])

    useEffect(() => {
        const cash = data.filter((ele) => ele.payment === "cash")
        const showCash = cash.reduce((acc, current) => acc + current.total, 0);
        setCash(showCash)
        const card = data.filter((ele) => ele.payment === "card")
        const showCard = card.reduce((acc, current) => acc + current.total, 0);
        setCard(showCard)
        const upi = data.filter((ele) => ele.payment === "upi")
        const showUpi = upi.reduce((acc, current) => acc + current.total, 0);
        setUpi(showUpi)

        const other = data.filter((ele) => ele.payment === "zomato"||ele.payment === "other"||ele.payment === "delivery"||ele.payment === "swiggy")
        const showOther = other.reduce((acc, current) => acc + current.total, 0);
        setOther(showOther)
        
        const total = data.reduce((acc, current) => acc + current.total, 0);
        setTotal(total)
        
    }, [data])


    return (
        <>
            <Header />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681201802/New_Project_7_jiaulw.png' /></div>
                    <h6>Bill</h6>
                    <p>{data.length}</p>
                </div>
                <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681192004/New_Project_3_afuhlk.png' /></div>
                    <h6>Cash</h6>
                    <p>{cash}</p>
                </div>

                <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681192175/New_Project_4_jmxkil.png' /></div>
                    <h6>Card</h6>
                    <p>{card}</p>
                </div>

                <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681192328/New_Project_5_cw22p7.png' /></div>
                    <h6>UPI</h6>
                    <p>{upi}</p>
                </div>
                <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681205248/New_Project_8_blkx43.png'/></div>
                    <h6>OTHERS</h6>
                    <p>{other}</p>
                </div>

                <div className='cercle'>
                    <div className='salelogo'><img className='saleimage' src='https://res.cloudinary.com/clennation/image/upload/v1681192288/New_Project_6_n3dwrf.png' /></div>
                    <h6>Total</h6>
                    <p>{total}</p>
                </div>

            </div>
            <div className='rowbox'>
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


                    {data.map((ele,i) => (


                       
                         <tr key={ele.table}>
                            <td>{i + 1}</td>
                            <td>sumit</td>
                            <td>Table {ele.table.slice(5, 9)}</td>
                            <td>{ele.time?.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                            <td>{ele.payment}</td>
                            <td>{ele.total}</td>
                            <td>View</td>
                        </tr>
                       
                    ))}



                </table>
            </div>
        </>
    )
}

export default Sale