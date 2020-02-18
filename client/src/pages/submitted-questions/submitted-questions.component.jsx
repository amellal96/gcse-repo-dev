import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { 
    getSubmittedQuestions, 
    deleteQuestion, 
    publishQuestion, 
    unpublishQuestion,
    getQuestion
 } from '../../actions/questions'

const SubmittedQuestions = ({ 
    getSubmittedQuestions, 
    deleteQuestion, 
    publishQuestion,
    unpublishQuestion,
    getQuestion,
    question: { questions, question }, 
    user: { user } 
}) => {

    const[questionToEdit, editButton] = useState({
        questionId: ''
    })

    useEffect(() => {
        getSubmittedQuestions(user && user.email);
    }, [getSubmittedQuestions, user]);

    // useEffect(() => {
    //     editQuestion(questionToEdit.questionId);
    // }, [editQuestion, questionToEdit.questionId])
    
    const published = (questionId) => (
        <div className='save'>
            <button 
            type="button" 
            className="btn btn-success" 
            onClick={() => unpublishQuestion(questionId)}>
            Published
            </button>
        </div>
    )
  
    const unpublished = (questionId) => (
        <div className='save'>
            <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => publishQuestion(questionId)}>
            Unpublished
            </button>
        </div>
    )

    const edit = async e => {
        e.preventDefault();
        editButton({...questionToEdit, questionId: e.target.value})
        getQuestion(e.target.value);

        // console.log("Printing question in state");
        // console.log(question && question);
    }

    if(question) {
        console.log("FOUND QUESTION");
        console.log(question);
        return <Redirect to='/edit' />
    }

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
                            { question && question.published ? published(question._id) : unpublished(question._id) }
                        </td>
                        <td>
                            <button type="button" value={question._id} className="btn btn-info" onClick={e => edit(e, question._id)}>Edit</button>

                            <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={() => deleteQuestion(question._id)}
                            >
                                Delete
                            </button>
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
    deleteQuestion: PropTypes.func.isRequired,
    publishQuestion: PropTypes.func.isRequired,
    unpublishQuestion: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    user: state.user
});

export default connect(mapStateToProps, { 
    getSubmittedQuestions, 
    deleteQuestion, 
    publishQuestion, 
    unpublishQuestion,
    getQuestion 
}) 
(SubmittedQuestions);