import {
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL
} from './question.types';

const INITIAL_STATE = {
    questions: [],
    question: null,
    loading: true,
    error: {}
}

const questionReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: payload,
                loading: false
            };
        case GET_QUESTIONS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

export default questionReducer;