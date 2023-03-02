import React from 'react';
import Menu from './Menu';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PrintIcon from "@mui/icons-material/Print";
import Login from './Login';

const Header = () => {
    return (
        <div className='container-fluid header'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2 col-md-2 col-sm-5 d-flex align-items-center'>
                        <Menu />
                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-2'>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-5 d-flex align-items-center'>
                        <ShoppingBasketIcon />
                        <EventNoteIcon />
                        <PrintIcon />
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;