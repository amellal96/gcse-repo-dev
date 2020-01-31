import axios from 'axios';

import {
    SAVE_QUESTION, USER_LOADED
} from '../redux/user/user.types';

import {
    QUESTION_ERROR
} from '../redux/question/question.types';

export const saveQuestion = (questionId) => async dispatch => {
    console.log(`Saving question: ${questionId}`);
    try {
        const res = await axios.post(`/api/users/save/${questionId}`, questionId);

        dispatch({
            type: SAVE_QUESTION,
            payload: res.data
        })

        // dispatch({
        //     type: USER_LOADED,
        //     payload: res.data
        // })
    } catch(err) {
        dispatch({
            type: QUESTION_ERROR
        })
    }
}