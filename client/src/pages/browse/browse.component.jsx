import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../actions/questions';
import { connect } from 'react-redux';

import QuestionItem from '../../components/question-item/question-item.component'

import './browse.styles.scss';

const Browse = ({ getQuestions, question: { questions } }) => {
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div className='homepage'>
      <h1>Browse Questions</h1>
      {/* {questions.map(question => <div>{question.question}</div>)} */}
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
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
                  <td>{question.topics.map(topic => <div>{topic}</div>)}</td>
                  <td>{question.examBoards.map(board => <div>{board}</div>)}</td>
                  <td>{question.difficulty}</td>
                  <td>Unsaved</td>
                </tr>
              </Fragment>
          )}
        </tbody>
      </table>
    </div>
  )
};
        {/* <QuestionItem /> */}

        {/* <div className='browse-questions-container'>
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
        </div> */}

QuestionItem.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
 question: state.question
});

export default connect(mapStateToProps, { getQuestions }) (Browse);