import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

import './header.styles.scss';

const Header = ({ auth: {isAuthenticated, loading}, logout }) => {
    const authLinks = (
        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/dashboard" >HOME<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/browse" >BROWSE<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/upload" >UPLOAD<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active" onClick={logout}> 
                    <a class="nav-link" href="/dashboard" >SIGN OUT<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/" >ABOUT <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    );

    const guestLinks = (
        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/dashboard" >HOME<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/signin" >SIGN IN <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/" >ABOUT<span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    );

    return (
        <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <a class="navbar-brand" href="#">GCSE Repo</a>

            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks  }</Fragment>) }
        </div> 

        // <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        //     <a class="navbar-brand" href="#">Navbar</a>
        //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        //         <span class="navbar-toggler-icon"></span>
        //     </button>

        //     <div class="collapse navbar-collapse" id="navbarColor01">
        //         <ul class="navbar-nav mr-auto">
        //         <li class="nav-item active">
        //             <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        //         </li>
        //         <li class="nav-item">
        //             <a class="nav-link" href="#">Features</a>
        //         </li>
        //         <li class="nav-item">
        //             <a class="nav-link" href="#">Pricing</a>
        //         </li>
        //         <li class="nav-item">
        //             <a class="nav-link" href="#">About</a>
        //         </li>
        //         </ul>
        //     </div>
        // </nav>
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