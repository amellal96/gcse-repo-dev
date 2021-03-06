import {
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
} from './question.types';

const INITIAL_STATE = {
    questions: [],
    question: null,
    filteredQuestions: null,
    loading: true,
    error: {}
}

const questionReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_QUESTIONS_SUCCESS:
        case GET_SUBMITTED_QUESTIONS:
            return {
                ...state,
                questions: payload,
                loading: false
            };
        case FILTER_QUESTIONS:
            return {
                ...state,
                filteredQuestions: payload,
                loading: false
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== payload),
                loading: false
            };
        case EDIT_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question =>
                    question._id === payload._id ? { payload } : question)
            }
        case QUESTION_PUBLISH_CHANGE:
            return {
                ...state,
                questions: state.questions.map(question => 
                    question._id === payload._id ? { ...question, published: payload.published } : question),
                loading: false
            }
        case RATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question =>
                    question._id === payload._id ? { 
                        ...question, 
                        ratings: payload.ratings, 
                        rating: payload.rating }: question)
            }
        case GET_QUESTION:
            return {
                ...state,
                question: payload
            }
        case GET_QUESTIONS_FAIL:
        case QUESTION_ERROR:
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