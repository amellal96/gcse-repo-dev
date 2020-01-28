import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSubmittedQuestions } from '../../actions/questions'

// import BrowseContainer from '../../components/browse-container/browse-container.component';

const SubmittedQuestions = ({ getSubmittedQuestions, question: { questions }, user: { user } }) => {
    useEffect(() => {
        getSubmittedQuestions(user && user.email);
    }, [getSubmittedQuestions, user]);

    // <button type="button" class="btn btn-danger">Danger</button>
    
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
                <th>Published (click to change)</th>
                <th>Edit</th>
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
                        <td><button type="button" className="btn btn-success">Published</button></td>
                        <td>
                            <button type="button" className="btn btn-secondary">Edit</button>
                            <button type="button" className="btn btn-secondary">Delete</button>
                        </td>
                    </tr>
                    </Fragment>
                )}
            </tbody>
            </table>
        </div>
    )
}

SubmittedQuestions.propTypes = {
    getSubmittedQuestions: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    user: state.user
});

export default connect(mapStateToProps, { getSubmittedQuestions }) (SubmittedQuestions);