import axios from 'axios';

import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL,
    GET_SUBMITTED_QUESTIONS,
    DELETE_QUESTION,
    QUESTION_ERROR,
    QUESTION_PUBLISH_CHANGE
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
    }
    catch(err) {
        console.log("FIRST BIT DIDN'T WORK");
        // const errors = err.response.data.errors;
  
    //   if (errors) {
    //     console.log(err);
    //   }

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
    console.log("Printing email")
    console.log(email);
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
        { params: { questionIds: questionIds} } )

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
    console.log(`Deleting question: ${questionId}`);
    try {
        await axios.delete(`/api/questions/${questionId}`)

        dispatch({
            type: DELETE_QUESTION,
            payload: questionId
        })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const publishQuestion = questionId => async dispatch => {
    console.log("Publishing question");
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
    console.log("Unpublishing question");
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
}