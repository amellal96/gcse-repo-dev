import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from '../redux/user/user.types';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } 
  catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}
  
// Register User
export const register = ({ firstName, surname, email, password, accountType }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("Register in action happening");

  const body = JSON.stringify({ firstName, surname, email, password, accountType });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    // dispatch(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;

    if (err) {
      console.log(err);
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  }
  catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(err);
      errors.forEach(error => console.log(error));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
}

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}