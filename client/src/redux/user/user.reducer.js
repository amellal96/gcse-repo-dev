import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
};

export default userReducer;