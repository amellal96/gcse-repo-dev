import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardOptions from '../../components/dashboard-options/dashboard-options.component'

import './dashboard.styles.scss';

const Dashboard = ({ user: {user} }) => {
    return (
        <div>
            <h1>Welcome { user && user.firstName }</h1>
            <h3>Links</h3>
            
            <DashboardOptions accountType={user && user.accountType} />
        </div>
    ) 
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps) (Dashboard);