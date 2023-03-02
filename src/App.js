import './App.css';
import Header from './Header';
import {BrowserRouter as  Router,Routes,Route } from 'react-router-dom';
import Home from './Home';
import Dish from './Dish';

function App() {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dish/:id' element={<Dish/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
