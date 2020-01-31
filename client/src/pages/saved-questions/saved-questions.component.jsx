import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SavedQuestions = ({ user: { user }}) => {

    return (
        <div className='my-questions-container'> 
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
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody> 
                {user && user.savedQuestions.map(question => 
                    <Fragment key={question._id}>
                    <tr className='table-active'>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>{question.marks}</td>
                        <td>{question.topics.map(topic => <div key={question._id + topic}>{topic}</div>)}</td>
                        <td>{question.examBoards.map(board => <div key={question._id + board}>{board}</div>)}</td>
                        <td>{question.difficulty}</td>
                        <td><button type="button" className="btn btn-danger">Unsave</button></td>
                    </tr>
                    </Fragment>
                )}
            </tbody>
            </table>
        </div>
    )
}

SavedQuestions.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    user: state.user
});

export default connect(mapStateToProps) (SavedQuestions);