import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL
  } from '../actions/types';

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  

  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case UPLOAD_SUCCESS:
          localStorage.setItem('token');
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
      case UPLOAD_FAIL:
      default:
        return state;
    }
  }