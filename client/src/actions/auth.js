import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
  
  // Register User
  export const register = ({ firstName, surname, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log("Register in action happening");
  
    const body = JSON.stringify({ firstName, surname, email, password });
  
    try {
      const res = await axios.post('/api/users', body, config);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
  
      // dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        console.log("Error");
        // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };