import React from 'react';

import BrowseContainer from '../../components/browse-container/browse-container.component'

import './browse.styles.scss';

const Browse = () => {
  return (
    <div className='homepage'>
      <h1>Browse Questions</h1>
      <BrowseContainer />      
    </div>
  )
};

export default Browse;