import React from 'react';
import { Link } from 'react-router-dom';
import square from '../../images/square.png';

import './dashboard-options.styles.scss';

const DashboardOptions = ({ accountType }) => {
    return (
        <div className='options-container'>
                <div className='dashboard-option'>
                    <Link to='/browse'>
                        <div className='option-text'>Browse</div>
                        <img src={square} alt=''/>
                    </Link>
                </div>

                {accountType === 'teacher' ? 
                   <div>
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
                    </div>
                : '' }
                
                <div className='dashboard-option'>
                    <Link to='/saved-questions'>
                        <div className='option-text'>Saved Questions</div>
                        <img src={square} alt=''/>
                    </Link>
                </div>
        </div>
    ) 
}

export default DashboardOptions;