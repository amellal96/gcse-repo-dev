import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

import './header.styles.scss';

const Header = ({ auth: {isAuthenticated, loading}, logout }) => {
    const authLinks = (
        <div className='options'>
            <Link className='option' to="/dashboard">
                HOME
            </Link>
            <Link className='option' to="/browse">
                BROWSE
            </Link>
            <Link className='option' to="/upload">
                UPLOAD
            </Link>  
            <Link className='option' to="/" onClick={logout}>
                SIGN OUT
            </Link>
            <Link className='option' to="/">
                ABOUT
            </Link>    
        </div>
    );

    const guestLinks = (
        <div className='options'>
            <Link className='option' to="/">
                HOME
            </Link>
            <Link className='option' to='/signin'>
                SIGN IN
                </Link>
            <Link className='option' to="/">
                ABOUT
            </Link>    
        </div>        
    );

    return (
        <div className='header'>
            <img src='../assets/logo.png'  alt='site-logo'/> 

            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks  }</Fragment>) }
        </div> 
    )
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.user
});

export default connect(mapStateToProps, { logout })(Header);