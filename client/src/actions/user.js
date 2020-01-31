import axios from 'axios';

import {
    SAVE_QUESTION,
    UNSAVE_QUESTION
} from '../redux/user/user.types';

import {
    QUESTION_ERROR
} from '../redux/question/question.types';

export const saveQuestion = (questionId) => async dispatch => {
    console.log(`Saving question: ${questionId}`);
    try {
        await axios.post(`/api/users/save/${questionId}`, questionId);

        dispatch({
            type: SAVE_QUESTION,
            payload: questionId
        });

        
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}

export const unsaveQuestion = (questionId) => async dispatch => {
    console.log(`Unsaving question: ${questionId}`);

    try {
        await axios.delete(`/api/users/unsave/${questionId}`, questionId);

        dispatch({
            type: UNSAVE_QUESTION,
            payload: questionId
        });
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}