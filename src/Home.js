import React from "react"
import { useNavigate } from 'react-router-dom';
import { db } from "./firebase";

import Tab from "./Tab";

const Home = () => {
    
    const navigate =useNavigate()
    const addTable = (doc) => {
        console.log(doc);
       navigate(`/dish/${doc}`)

    }
    
    const arr = ["table1","table2","table3","table4","table5","table6","table7","table8","table9","table10","table11","table12"]
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='all_tables col-lg-8 col-md-8 col-sm-12 mt-2'>
                <Tab/>
                    <div className='row'>
                        {arr.map((doc) => (
                            <div className='table col-3'><div className='table_box'>
                                <button className='hide'>.</button>
                                <button className='hide'>.</button>
                                <button onClick={() => addTable(doc)} className='add_table'>Add Cart {doc}</button>
                            </div></div>
                        ))}
                    </div>
                </div>
                <div className='single_bill col-lg-4 col-md-4 col-sm-12'>

                </div>
            </div>
        </div>
    )
}

export default Home;