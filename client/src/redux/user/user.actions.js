import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './user.types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});