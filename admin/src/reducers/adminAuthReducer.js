import { AUTH_ADMIN, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

const adminAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_ADMIN:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default adminAuthReducer;