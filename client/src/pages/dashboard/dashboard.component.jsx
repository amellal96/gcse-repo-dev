import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dashboard.styles.scss';

const Dashboard = ({ auth, user }) => {
    return (
        <h1>Welcome { auth.token } !</h1>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.user,
    user: state.user.user
});

export default connect(mapStateToProps) (Dashboard);