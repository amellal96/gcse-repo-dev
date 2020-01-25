import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import square from '../../images/square.png';

import './dashboard.styles.scss';

const Dashboard = ({ user: {user}, isAuthenticated }) => {
    // if(!isAuthenticated) {
    //     return <Redirect to='/' />
    // }

    // console.log(isAuthenticated);

    return (
        <div>
            <h1>Welcome { user.firstName }</h1>

            <h3>Links</h3>
            
            <div className='options-container'>
                <div className='dashboard-option'>
                    <div className='option-text'>My questions</div>
                    <img src={square} />
                </div>

                <div className='dashboard-option'>
                    <div className='option-text'>Upload Question</div>
                    <img src={square} />
                </div>

                <div className='dashboard-option'>
                    <div className='option-text'>Saved Questions</div>
                    <img src={square} />
                </div>
            </div>
        </div>
    ) 
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps) (Dashboard);