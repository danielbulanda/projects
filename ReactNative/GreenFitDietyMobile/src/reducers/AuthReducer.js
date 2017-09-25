import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOADING_USER,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  email: 'test@test.pl',
  password: 'greenfit859',
  user: null,
  error: '',
  loading: false,
  contact: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Nieprawidłowe dane logowania',
        password: '',
        loading: false,
        contact: true
      };
    case LOADING_USER:
      return { ...state, loading: action.payload, error: '' };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
