import React, { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import Tab from "./Tab";
import Header from "./Header";
import useCart from "./hooks/useCart";
import { db } from "./firebase";

const Home = () => {
    
    const {user}  = useCart()
    const [table,setTable] = useState([])
    console.log(table,"jj");
    const navigate = useNavigate()

    useEffect(() => {
    db.collection("restaurants").doc(user.uid).collection("table").onSnapshot(snapshot=>(
        setTable(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
    ))
    },[user.uid])
    
    
    const addTable = (doc) => {
        navigate(`/dish/${doc.data.name}`)
        db.collection('restaurants').doc(user.uid).collection("table").doc(doc.id).set({
            name: doc.data.name,
            isOnline: true
        }); 
      };
      
   
    
    return (
       <>
       <Header/>
        <div className='container-fluid'>
            <div className='row'>
                <div className='all_tables col-lg-8 col-md-8 col-sm-12 mt-2'>
                    <Tab />
                    <div className='row'>
                        {table.map((doc) => (
                            <div key={doc.id} className='table col-3'><div className="table_box">
                             <button className='hide'>.</button>
                                <button className='hide'>.</button>
                                <button style={{cursor:"pointer"}} onClick={() => addTable(doc)} className='add_table'>Table {doc.data.name}</button>
                            </div></div>
                        ))}
                    </div>
                </div>
                <div className='single_bill col-lg-4 col-md-4 col-sm-12'>

                </div>
            </div>
        </div>
       </>
    )
}

export default Home;