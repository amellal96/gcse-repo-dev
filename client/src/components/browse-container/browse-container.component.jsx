import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestions } from '../../actions/questions';
import { saveQuestion } from '../../actions/user';

const BrowseContainer = ({ getQuestions, saveQuestion, question: { questions }, user: { user }}) => {
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
                <Fragment key={question._id}>
                  <tr className='table-active'>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>{question.marks}</td>
                    <td>{question.topics.map(topic => <div key={question._id + topic}>{topic}</div>)}</td>
                    <td>{question.examBoards.map(board => <div key={question._id + board}>{board}</div>)}</td>
                    <td>{question.difficulty}</td>
                    <td><button 
                      type="button" 
                      className="btn btn-primary" 
                      onClick={() => saveQuestion(question._id)}>
                        Save</button>
                    </td>
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
  saveQuestion: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
  question: state.question,
  user: state.user
});
  
export default connect(mapStateToProps, { getQuestions, saveQuestion }) (BrowseContainer);