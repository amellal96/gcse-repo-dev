import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import { ReactComponent as Logo } from '../../assets/logo.png';

import './header.styles.scss';

const Header = () => (
    <div className='header'>
        <img src='../assets/logo.png'  alt='site-logo'/>
        <div className='options'>
            <Link className='option' to="/">
                HOME
            </Link>
            <Link className='option' to="/browse">
                BROWSE
            </Link>
            <Link className='option' to="/upload">
                UPLOAD
            </Link>  
            <Link className='option' to="/signin">
                SIGN IN
            </Link>  
            <Link className='option' to="/">
                ABOUT
            </Link>    
        </div>
    </div>
);

export default Header; 