import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import './dashboard.styles.scss';

const Dashboard = ({ user: {user}, isAuthenticated }) => {
    // if(!isAuthenticated) {
    //     return <Redirect to='/' />
    // }

    // console.log(isAuthenticated);

    return (
    <h1>Welcome { user.firstName } {user.surname}!</h1>
    ) 
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps) (Dashboard);