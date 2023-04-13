import React from "react"
import { useNavigate } from 'react-router-dom';
import Tab from "./Tab";
import Header from "./Header";

const Home = () => {

    const navigate = useNavigate()
    
    const addTable = (doc) => {
        navigate(`/dish/${doc}`)

    }
    
    const arr = [{id:"1",name:"table1"},{id:"2",name:"table2"},{id:"3",name:"table3"},{id:"4",name:"table4"},{id:"5",name:"table5"},{id:"6",name:"table6"},{id:"7",name:"table7"},{id:"8",name:"table8"},{id:"9",name:"table9"},{id:"1",name:"table1"}]
   
    
    return (
       <>
       <Header/>
        <div className='container-fluid'>
            <div className='row'>
                <div className='all_tables col-lg-8 col-md-8 col-sm-12 mt-2'>
                    <Tab />
                    <div className='row'>
                        {arr.map((doc) => (
                            <div key={doc.id} className='table col-3'><div className='table_box'>
                                <button className='hide'>.</button>
                                <button className='hide'>.</button>
                                <button onClick={() => addTable(doc.name)} className='add_table'>Table {doc.name.slice(5,6)}</button>
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