import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import square from '../../images/square.png';

import './dashboard.styles.scss';

const Dashboard = ({ user: {user} }) => {
    return (
        <div>
            <h1>Welcome { user && user.firstName }</h1>
            <h3>Links</h3>
            
            <div className='options-container'>
                <div className='dashboard-option'>
                    <Link to='/submitted-questions'>
                        <div className='option-text'>My questions</div>
                        <img src={square} alt=''/>
                    </Link>
                </div>

                <div className='dashboard-option'>
                    <Link to='/upload'>
                        <div className='option-text'>Upload Question</div>
                        <img src={square} alt=''/>
                    </Link>
                </div>

                <div className='dashboard-option'>
                    <div className='option-text'>Saved Questions</div>
                    <img src={square} alt=''/>
                </div>
            </div>
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