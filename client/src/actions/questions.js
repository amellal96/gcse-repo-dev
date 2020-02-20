import axios from 'axios';

import { setAlert } from './alert';

import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTION,
    GET_QUESTIONS_FAIL,
    GET_SUBMITTED_QUESTIONS,
    DELETE_QUESTION,
    QUESTION_ERROR,
    QUESTION_PUBLISH_CHANGE,
    FILTER_QUESTIONS,
    RATE_QUESTION,
    EDIT_QUESTION
} from '../redux/question/question.types';

export const upload = ({ question, answer, marks, difficulty, examBoards, topics, submittedBy }) => async dispatch => {
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
    };

    console.log("Upload question API being called");

    const body = JSON.stringify({ question, answer, marks, difficulty, examBoards, topics, submittedBy });

    try {
        const res = await axios.post('/api/questions', body, config);

        dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data
        });

    dispatch(setAlert("Question successfully uploaded!", 'success'));
    }
    catch(err) {
        console.log("FIRST BIT DIDN'T WORK");
        const errors = err.response.data.errors;
  
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          }

      dispatch({
          type:UPLOAD_FAIL
      });
    }
}

export const getQuestions = () => async dispatch => {
    try {
        const res = await axios.get('/api/questions');
        
        dispatch({
            type: GET_QUESTIONS_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_QUESTIONS_FAIL
        });
    }
}

export const getSubmittedQuestions = email => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/${email}`);
        
        dispatch({
            type: GET_SUBMITTED_QUESTIONS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_QUESTIONS_FAIL
        })
    }
}
 
export const getSavedQuestions = questionIds => async dispatch => {
    try {
        console.log(`Getting saved questions: ${questionIds}`);
        const res = await axios.get(`/api/questions/getSaved/${questionIds}`, 
        { params: { questionIds: questionIds }} )

        dispatch({
            type: GET_QUESTIONS_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: GET_QUESTIONS_FAIL
        })
    }
} 

export const deleteQuestion = questionId => async dispatch => { 
    try {
        await axios.delete(`/api/questions/${questionId}`)

        dispatch({
            type: DELETE_QUESTION,
            payload: questionId
        })

        dispatch(setAlert("Question deleted", 'success'));
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const publishQuestion = questionId => async dispatch => {
    try {
        const res = await axios.put(`/api/questions/publish/${questionId}`)

        dispatch({
            type: QUESTION_PUBLISH_CHANGE,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const unpublishQuestion = questionId => async dispatch => {
    try {
        const res = await axios.put(`/api/questions/unpublish/${questionId}`)

        dispatch({
            type: QUESTION_PUBLISH_CHANGE,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
};

export const filterQuestions = (filters, questions) => async dispatch => {
    var filteredQuestions = []
    
    // Filter exam boards
    if(filters.examBoards.length) {
        filteredQuestions = questions.filter(
            question => question.examBoards.some(
                examBoard => filters.examBoards.includes(examBoard))
        );
    }
    else {
        filteredQuestions = questions;
    }

    // Filter topics
    if(filters.topics.length) {
        filteredQuestions = filteredQuestions.filter(
            question => question.topics.some(
                topic => filters.topics.includes(topic))
        );
    }

    // Difficutly range
    filteredQuestions = filteredQuestions.filter(
        question => question.difficulty <= filters.difficulty.max && question.difficulty >= filters.difficulty.min
    );

    // Marks range
    filteredQuestions = filteredQuestions.filter(
        question => question.marks <= filters.marks.max && question.marks >= filters.marks.min
    );

    try {
        dispatch({
            type: FILTER_QUESTIONS,
            payload: filteredQuestions.length ? filteredQuestions : questions
        })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
};

export const rateQuestion = (rating, questionId, userId) => async dispatch => {
    try {
        const params =  { 
            rating: rating,
            userID: userId,
            questionId: questionId
        };
        const res = await axios.put(`/api/questions/rate/`, params)

        dispatch({
            type: RATE_QUESTION,
            payload: res.data
        })

    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const getQuestion = (questionId) => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/getQuestion/${questionId}`)
        dispatch ({
            type: GET_QUESTION,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const editQuestion = (questionId, questionTest, answer, marks, difficulty, examBoards, topics, history) => async dispatch => {
    console.log("Editing question ROUTE");

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ questionId, questionTest, answer, marks, difficulty, examBoards, topics });

    try {
        const res = await axios.post('/api/questions/edit', body, config);

        dispatch({
            type: EDIT_QUESTION,
            payload: res.data
        });

        dispatch(setAlert("Question successfully edited!", 'success'));
    } catch (err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}