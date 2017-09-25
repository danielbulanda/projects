import axios from 'axios';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOADING_USER,
  LOGOUT
} from '../actions/types';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = password => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

export const signOut = () => {
  return dispatch => {
    Actions.auth();
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export const loginUser = ({ email, password, provider }) => {
  const headers = {
    'Content-Type': 'application/json',
    email,
    password
  };
  return dispatch => {
    dispatch({ type: LOADING_USER, payload: provider });
    axios.get('http://10.0.2.2:4000/auth/api_login', { headers })
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user.data });
        Actions.main({ type: ActionConst.RESET });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: error
        });
      });
  };
};
