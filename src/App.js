import './App.css';
import Header from './Header';
import {BrowserRouter as  Router,Routes,Route,Navigate } from 'react-router-dom';
import Home from './Home';
import Dish from './Dish';
import LoginScreen from './LoginScreen';
import BillingScreen from './BillingScreen';
import useCart from './hooks/useAuth';
import Sale from './Sale';
import AddProuct from './AddProuct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import useAuth from './hooks/useAuth';
axios.defaults.withCredentials = true

function App() {

  const {user} = useAuth()

  return (
    <>
    <Router>
      <Routes>
        {!user?<Route path='/' element={<LoginScreen/>}/>:
        <>
        <Route path='/' element={<Home/>}/>
        <Route path='/dish' element={<Dish/>}/>
        <Route path='/payment' element={<BillingScreen/>}/>
        <Route path='/sale-report' element={<Sale/>}/>
        <Route path='/add-product' element={<AddProuct/>}/></>}
 
      </Routes>
    </Router>
    </>
  );
}

export default App;
