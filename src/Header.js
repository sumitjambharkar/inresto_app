    import React from 'react';
    import Menu from './Menu';
    import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
    import EventNoteIcon from "@mui/icons-material/EventNote";
    import PrintIcon from "@mui/icons-material/Print";
    import Login from './Login';
    import IconButton from '@mui/material/IconButton';

    const Header = () => {
        const d = new Date()
        return (
            <div className='container-fluid header'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-2 col-md-2 col-sm-5 d-flex align-items-center'>
                            <Menu />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-2 tex'>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-5 d-flex align-items-center'>
                        <IconButton style={{color:"#fff",outline:"none"}}>{d.toLocaleDateString()}
                    </IconButton>
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