import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSavedQuestions } from '../../actions/questions';
import { saveQuestion, unsaveQuestion } from '../../actions/user';

import './saved-questions.styles.scss';

const SavedQuestions = ({ getSavedQuestions, saveQuestion, unsaveQuestion, question: { questions }, user: { user }}) => {
    useEffect(() => {
        getSavedQuestions(user && user.savedQuestions);
    }, [getSavedQuestions, user]);

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
        <div className='my-questions-container'> 
            {console.log(user && user.savedQuestions)};
            <h1>My Saved Questions</h1> 
            <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Marks</th>
                    <th>Topics</th>
                    <th>Exam Boards</th>
                    <th>Grade</th>
                    <th>Actions</th>
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
}

SavedQuestions.propTypes = {
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired, 
    getSavedQuestions: PropTypes.func.isRequired,
    saveQuestion: PropTypes.func.isRequired,
    unsaveQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    user: state.user
});

export default connect(mapStateToProps, { getSavedQuestions, saveQuestion, unsaveQuestion }) (SavedQuestions);