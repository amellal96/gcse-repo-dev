import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../actions/questions';
import { connect } from 'react-redux';

const BrowseContainer = ({ getQuestions, question: { questions } }) => {
    useEffect(() => {
      getQuestions();
    }, [getQuestions]);
  
    return (
      <div className='homepage'>  
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Marks</th>
              <th>Topics</th>
              <th>Exam Boards</th>
              <th>Grade</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => 
                <Fragment>
                  <tr className='table-active'>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>{question.marks}</td>
                    <td>{question.topics.map(topic => <div>{topic}</div>)}</td>
                    <td>{question.examBoards.map(board => <div>{board}</div>)}</td>
                    <td>{question.difficulty}</td>
                    <td><button type="button" className="btn btn-primary">Save</button></td>
                  </tr>
                </Fragment>
            )}
          </tbody>
        </table>
      </div>
    )
  };
  
BrowseContainer.propTypes = {
  getQuestions: PropTypes.func.isRequired,
};
  
const mapStateToProps = state => ({
  question: state.question
});
  
export default connect(mapStateToProps, { getQuestions }) (BrowseContainer);