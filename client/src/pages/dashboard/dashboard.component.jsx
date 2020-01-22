import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dashboard.styles.scss';

const Dashboard = ({ user: {user} }) => {
        return (
        <h1>Welcome { user.firstName } {user.surname}!</h1>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    // user: state.user.user
});

export default connect(mapStateToProps) (Dashboard);