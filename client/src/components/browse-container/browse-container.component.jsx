import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuestions } from '../../actions/questions';
import { saveQuestion, unsaveQuestion } from '../../actions/user';

const BrowseContainer = ({ getQuestions, saveQuestion, unsaveQuestion, question: { questions }, user: { user }}) => {
    useEffect(() => {
      getQuestions();
    }, [getQuestions]);

    const saveButton = (questionId) => (
      <div className='save'>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => saveQuestion(questionId)}>
          Save
        </button>
      </div>
    )

    const unsaveButton = (questionId) => (
      <div className='save'>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => unsaveQuestion(questionId)}>
          Unsave
        </button>
      </div>
    )
  
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
                    <td>
                      { user && (user.savedQuestions).includes(question._id) ? unsaveButton(question._id) : saveButton(question._id) }
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
  saveQuestion: PropTypes.func.isRequired,
  unsaveQuestion: PropTypes.func.isRequired
};
  
const mapStateToProps = state => ({
  question: state.question,
  user: state.user
});
  
export default connect(mapStateToProps, { getQuestions, saveQuestion, unsaveQuestion }) (BrowseContainer);