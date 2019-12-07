import React from 'react';

import './browse.styles.scss';

const Browse = () => (
    <div className='homepage'>
      <h1>Browse Questions</h1>

      <div className='browse-questions-container'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Exam Boards</th>
              <th>Topics</th>
              <th>Grade</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            <tr className='table-active'>
              <td>Find x in: x + 4 = 3x - 4</td>
              <td>x=4</td>
              <td>Edexcel</td>
              <td>Algebra</td>
              <td>1</td>
              <td>Save</td>
            </tr>
            <tr className='table-active'>
              <td>What is 5 * 10?</td>
              <td>50</td>
              <td>AQA</td>
              <td>Number</td>
              <td>1</td>
              <td>Save</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

export default Browse;