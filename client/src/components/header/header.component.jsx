import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
// import { createStructuredSelector } from 'reselect';

import './header.styles.scss';

const Header = ({ currentUser }) => (
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
            {currentUser ? (
                <div className='option' onClick={() => console.log("Clicked sign out")}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                SIGN IN
                </Link>
            )}
            <Link className='option' to="/">
                ABOUT
            </Link>    
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);