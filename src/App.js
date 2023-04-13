import './App.css';
import Header from './Header';
import {BrowserRouter as  Router,Routes,Route,Navigate } from 'react-router-dom';
import Home from './Home';
import Dish from './Dish';
import LoginScreen from './LoginScreen';
import BillingScreen from './BillingScreen';
import useCart from './hooks/useCart';
import Sale from './Sale';

function App() {
  const {user}   = useCart()
  
  return (
    <>
    <Router>
      <Routes>
        {!user?
        <Route path='/' element={<LoginScreen/>}/>:
        <>
        <Route path='/' element={<Home/>}/>
        <Route path='/dish/:id' element={<Dish/>}/>
        <Route path='/payment/:id' element={<BillingScreen/>}/>
        <Route path='/sale-report' element={<Sale/>}/>
        </>}
      </Routes>
    </Router>
    </>
  );
}

export default App;
